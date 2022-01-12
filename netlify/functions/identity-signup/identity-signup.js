const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { user } = JSON.parse(event.body);

  const myResponseBody = {
    app_metadata: {
      roles:
        user.email.split('@')[1] === 'trust-this-company.com'
          ? ['editor']
          : ['visitor']
    },
    user_metadata: {
      ...user.user_metadata // append current user metadata
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
    return fetch(process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT, {
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
