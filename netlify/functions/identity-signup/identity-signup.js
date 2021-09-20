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
    mutation InsertUser($email: String!, $id: String) {
        insert_User_one(object:{id: $id, email: $email}) {
          id
          email
        }
    }
  `,
    variables: {
      id: user.id,
      email: user.email,
    },
  });

  const result = await fetch(
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
  const { errors } = await result.json();

  if (errors) {
    return {
      statusCode: 500,
      body: 'Something is wrong',
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  }
};
