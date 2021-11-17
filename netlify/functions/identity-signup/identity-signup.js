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

  const updateUserFetch = async () => {
    const updateUser = JSON.stringify({
      query: `
    mutation UpdateUser($email: String, $id: String) {
      update_User(where: {email: {_eq: $email}}, _set: {id: $id}) {
      returning {
        id
      }
      affected_rows
    }
  }
  `,
      variables: {
        email: user.email,
        id: user.id,
      },
    });

    await fetch(process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT, {
      method: 'POST',
      body: updateUser,
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_PASSWORD,
      },
    });
  };

  const createUser = async () => {
    return await fetch(process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT, {
      method: 'POST',
      body: responseBodyString,
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_PASSWORD,
      },
    });
  };

  for (let i = 0; i < 2; i++) {
    const result = await createUser();

    if (result.ok) {
      const { errors } = result.json();

      if (!errors) {
        return {
          statusCode: 200,
          body: JSON.stringify(responseBody),
        };
      } else if (errors[0]['extensions']['code'] === 'constraint-violation') {
        for (let i = 0; i < 2; i++) {
          const result = await updateUserFetch();
          if (result.ok) {
            const { errors } = result.json();
            if (!errors) {
              return {
                statusCode: 200,
                body: JSON.stringify(responseBody),
              };
            } else {
              return {
                statusCode: 200,
                body: 'error',
              };
            }
          } else {
            if (i === 2) {
              return {
                statusCode: 200,
                body: 'error',
              };
            }
          }
        }
      } else {
        return {
          statusCode: 200,
          body: 'error',
        };
      }
    } else {
      if (i === 2) {
        return {
          statusCode: 200,
          body: 'error',
        };
      }
    }
  }
};
