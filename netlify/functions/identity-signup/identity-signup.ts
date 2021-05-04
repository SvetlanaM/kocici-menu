// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions
import axios from 'axios';


interface UserType {
  id: string,
  email: string,
};

const handler = async function (event) {
  const data = JSON.parse(event.body);
  const { user } = data;

  const responseBody = {
    user_metadata: {
      ...user.user_metadata
    }
  };

  const requestBodyString = JSON.stringify({
    query: `
    mutation InsertUser($email: String!, $id: String!){
      insert_users(objects: {id: $id, email: $email}) {
        id
      }
    }    
  `,
    variables: {
      id: user.id,
      email: user.email,
    },
  });

  console.log(requestBodyString)
  console.log("test")
  await axios.post<UserType>(process.env.NEXT_PUBLIC_CAT_APP_TESTING_API_ENDPOINT || '', {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          process.env.HASURA_PASSWORD
      },
      body: requestBodyString
    }).then(response => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};

module.exports = { handler };
