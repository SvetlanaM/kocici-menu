const fetch = require('node-fetch');

exports.handler = async function (event, context) {
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
      custom_data_from_function: 'hurray this is some extra metadata',
    },
  };

  const responseBodyString = JSON.stringify({
    query: `
    mutation InsertUser($email: String!, $id: uuid!) {
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

  console.log(responseBodyString);

  const result = await fetch(
    process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT,
    {
      method: 'POST',
      body: responseBodyString,
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'catapp123',
      },
    }
  );
  const { errors, data } = await result.json();

  if (errors) {
    console.log(errors);
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
