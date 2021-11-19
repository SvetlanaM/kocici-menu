const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const createJWT = (user_id) => {
  const secretKey =
    '-----BEGIN RSA PRIVATE KEY-----\n' +
    process.env.JWT_SECRET_KEY +
    '\n-----END RSA PRIVATE KEY-----';

  const payload = {
    sub: user_id,
    iat: 1516239022,
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['editor', 'user', 'mod'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': user_id,
    },
  };

  const token = jwt.sign(payload, secretKey, {
    algorithm: 'RS256',
  });
  return token;
};

exports.handler = async function (event) {
  const { user } = JSON.parse(event.body);

  console.log(user);
  console.log(event);

  const responseBody = {
    app_metadata: {
      roles:
        user.email.split('@')[1] === 'trust-this-company.com'
          ? ['editor']
          : ['visitor'],
      my_user_info: 'this is some user info',
    },
    user_metadata: {
      ...user.user_metadata, // append current user metadata
      my_token: createJWT(user.id),
    },
  };

  const responseBodyString = JSON.stringify({
    query: `
    mutation AddOrUpdateUser($user: [User_insert_input!]!) {
    insert_User(
      objects: $user
      on_conflict: {
        constraint: User_email_key,
        update_columns: [id, email]
      }
      ) {
        returning {
        id
      }
    }
  }
  `,
    variables: {
      user: [
        {
          id: user.id,
          email: user.email,
        },
      ],
    },
  });

  const resultFetch = await fetch(
    process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT,
    {
      method: 'POST',
      body: responseBodyString,
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_PASSWORD,
      },
    }
  );

  const result = await resultFetch.json();
  if (result.ok) {
    console.log(result);
    const { errors } = result;

    console.log(errors);
    if (errors) {
      return {
        statusCode: 500,
        body: 'error',
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  }

  console.log('last_run');
  return {
    statusCode: 500,
    body: 'error',
  };
};
