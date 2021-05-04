// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions
// import axios from 'axios';

// // interface UserType {
// //   id: string;
// //   email: string;
// // }

// const handler = async function (event) {
//   console.log('test');
//   const data = JSON.parse(event.body);
//   const { user } = data;

//   const responseBody = {
//     user_metadata: {
//       ...user.user_metadata,
//     },
//   };

//   const requestBodyString = JSON.stringify({
//     query: `
//     mutation InsertUser($email: String!, $id: uuid!) {
//         insert_User_one(object:{id: $id, email: $email}) {
//           id
//         }
//     }
//   `,
//     variables: {
//       id: user.id,
//       email: user.email,
//     },
//   });

//   await axios({
//     method: 'post',
//     url: process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT || '',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-hasura-admin-secret': process.env.HASURA_PASSWORD,
//     },
//     body: requestBodyString,
//   }).then(
//     (response) => {
//       console.log(response);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );

//   console.log(requestBodyString);

//   return {
//     statusCode: 200,
//     body: JSON.stringify(responseBody),
//   };
// };

// module.exports = { handler };

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
