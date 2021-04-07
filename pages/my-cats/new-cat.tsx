import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import CatForm from '../../components/cat-form';
import {
  AddCatMutation,
  AddCatMutationVariables,
  Cat_Insert_Input,
} from '../../graphql/generated/graphql';
import { ADD_CAT } from '../../graphql/mutations';
import Container from '../../components/container';
import Layout from '../../components/layout';
import Sidebar from '../../components/sidebar';
import Center from '../../components/center-container';
import Header from '../../components/head';

const CreateCat = () => {
  const [createCat, { error, data }] = useMutation<
    AddCatMutation,
    AddCatMutationVariables
  >(ADD_CAT);

  const handleSubmit = useCallback(
    async (catData: Cat_Insert_Input) => {
      const variables: AddCatMutationVariables = {
        cat: {
          name: catData.name,
          age: catData.age ?? null,
          user_id: catData.user_id,
          doctor_email: catData.doctor_email ?? null,
        },
      };

      try {
        await createCat({ variables });
        if (data && data.insert_Cat) {
          return true;
        } else {
          <p>{error?.message}</p>;
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    [createCat]
  );

  return (
    <Layout>
      <Header title="Pridat macku" />
      <Sidebar />
      <Container>
        <Center>
          <CatForm handleSubmit={handleSubmit} submitText="Pridat" />
        </Center>
      </Container>
    </Layout>
  );
};

export default CreateCat;
