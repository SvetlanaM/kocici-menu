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
import getTitle from '../../utils/get-title';
import Title from '../../components/title';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export default function CreateCat() {
  const router = useRouter();
  const [createCat, { error, data }] = useMutation<
    AddCatMutation,
    AddCatMutationVariables
  >(ADD_CAT);

  const handleSubmit1 = useCallback(
    async (catData: Cat_Insert_Input) => {
      const variables: AddCatMutationVariables = {
        cat: {
          name: catData.name,
          age: catData.age ?? null,
          user_id: catData.user_id,
          doctor_email: catData.doctor_email ?? null,
          nickname: catData.nickname ?? null,
          weight: catData.weight ?? null,
          type: catData.type ?? null,
          note: catData.note ?? null,
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

  const title = 'Pridať novú mačku';

  return (
    <Layout>
      <Header title={getTitle(title)} />
      <Sidebar />
      <Container>
        <Center>
          <Title title={title} />
          <CatForm handleSubmit1={handleSubmit1} submitText="Pridat" />
        </Center>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
