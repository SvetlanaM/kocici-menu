// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions
const fetch = require('node-fetch');

const handler = async function (event) {
  const data = JSON.parse(event.body);
  const { user } = data;

  console.log(user);

  let error;
  await fetch(process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_PASSWORD,
    },
    body: JSON.stringify({
      query: `mutation InsertUser($firstName: String!, $lastName: String!) {
          insert_User_one(object: {first_name: $firstName, last_name: $lastName}) {
            first_name
            id
          }
        }`,
      variables: {
        firstName: 'Roman',
        lastName: user.id,
      },
    }),
  })
    .then(function (response) {
      return response.json().then((a) => {
        error = a;
      });
    })
    .catch(function (err) {
      console.log(err);
      error = err.message;
    });

  const responseBody = {
    app_metadata: {
      roles:
        user.email.split('@')[1] === 'gmail.com' ? ['editor'] : ['visitor'],
      my_user_info: 'this is some user info',
    },
    user_metadata: {
      // append current user metadata
      ...user.user_metadata,
      custom_data_from_function: 'hurray this is some extra metadata',
      error: error,
      userId: user.id,
      heslo: process.env.HASURA_PASSWORD,
      endpoint: process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT,
    },
  };
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};

module.exports = { handler };
