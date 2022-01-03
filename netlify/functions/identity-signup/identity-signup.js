const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

createJWT = (user_id) => {
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

  my_token = createJWT(user.id)

  const myResponseBody = {
    app_metadata: {
      roles:
        user.email.split('@')[1] === 'trust-this-company.com'
          ? ['editor']
          : ['visitor'],
      my_user_info: 'this is some user info',
    },
    user_metadata: {
      ...user.user_metadata, // append current user metadata
      my_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZTIzYTgxMS05N2M2LTQ5NzgtOTdmMS03YTgwNGQ3ODA3MGEiLCJpYXQiOjE1MTYyMzkwMjIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJlZGl0b3IiLCJ1c2VyIiwibW9kIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMWUyM2E4MTEtOTdjNi00OTc4LTk3ZjEtN2E4MDRkNzgwNzBhIn19.E8H73UM7b3p9r1BckPeskOKQcpVQqtr5-OkPI2i6EX7Rvl8JJHTXheTC7Z1AGmSQKHRU_1ZUXNnmjnlTi27qhGTaW8X0brKW40EWU6MJeNmuMRDl_9tXs0cGvG2KCsk2u20c34ncILCSSnrBbM9PmahPRPARtVwCXW2gaZP1rnVJeunanPrfG-8zmW1GLaNWB8CHrs-_Bsrefwfx0lNZ7BAgs5idjB5fyeXx34m7vCivOK6lCNcD4kfOoUyV1QxzkRB0cI6bPPq7TC0quHrHouNldvvNaXbmfpqpPV8dht62_ktHGoU5zcUb3CM8P4R5uCLb7zqw9alHdtzrX_e7DtxkYFDGgBLtc5FRts8W6xDWMLIjxXOzftZ_uH8FvM0nBoA1x85EAKWa97MgQ9z3rpNuMfV1zG78JzPrnW9Oz_sS75-m9P-XJ58r2bwHpXpJTfYvdwuwNScmpFr1nQuaC2GxGf7La-V0ujxF8ry_-HoxQtun9pxoCfbKz3i7uOBCajiQml9uFejagJEG7pFiS3j_ByFcHnHQ5X2n_YZJ6X9ISQeiQOsrynz1iOH_lsIaMyMer0tOsbMo_GpCXw5-MltfA8uny7q0pDTkqSLew2wZWX3AKWzLBjK9XNdSkBwrdtkO4h34LdN11R1VvuJEO5hfC4zeWjIASaHJJJpZ0Io",
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

  let result;
  try {
    result = await createUser();
  } catch (error) {
    console.log("Error while fetching", error)
    return {
      statusCode: 500,
      body: 'Error',
    };
  }


  console.log(JSON.stringify(myResponseBody))

  if (result.ok) {
    const { errors } = result.json();
    if (errors) {
      console.log('Hasura errors', errors);
      return {
        statusCode: 500,
        body: 'Error',
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(myResponseBody),
    };
  } else {
    console.log("Error response code", result.status)
  }

  return {
    statusCode: 500,
    body: 'Error',
  };
};
