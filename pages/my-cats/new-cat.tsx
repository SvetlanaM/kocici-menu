import { useMutation } from '@apollo/client';
import { useCallback, useMemo } from 'react';
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
import Breadcrumbs from '../../components/breadcrumbs';
import Breadcrumb from '../../utils/breadcrumb';
import setUppercaseTitle from '../../utils/set-uppercase-title';
import { CATS_QUERY } from '../../graphql/queries';
import { getUser } from '../../utils/user';

export default function CreateCat() {
  const [createCat, { error, loading, data }] =
    useMutation<AddCatMutation, AddCatMutationVariables>(ADD_CAT);

  const handleSubmit1 = useCallback(
    async (catData: Cat_Insert_Input) => {
      const variables: AddCatMutationVariables = {
        cat: {
          name: setUppercaseTitle(catData.name || ''),
          age: catData.age ?? null,
          user_id: catData.user_id,
          doctor_email: catData.doctor_email ?? null,
          nickname: catData.nickname ?? null,
          weight: catData.weight ?? null,
          type: catData.type ?? null,
          note: catData.note ?? null,
          color: catData.color ?? null,
          daily_food: catData.daily_food ?? null,
        },
      };

      try {
        const result = await createCat({
          variables,
          update: (store, { data }) => {
            const catData = store.readQuery({
              query: CATS_QUERY,
              variables: {
                user_id: getUser(),
                withProducts: true,
              },
            });

            store.writeQuery({
              query: CATS_QUERY,
              variables: {
                user_id: getUser(),
                withProducts: true,
              },
              data: {
                cats: [...catData.cats, ...data!.insert_Cat?.returning],
                reviews: [],
              },
            });
          },
        });
        if (result.data?.insert_Cat?.returning) {
          return true;
        } else {
          console.log(error);
          return false;
        }
      } catch (e) {
        return false;
      }
    },
    [createCat]
  );

  const title = 'Pridať novú mačku';

  const breadcrumbs: Breadcrumb[] = useMemo(() => {
    return [
      {
        path: '/',
        name: 'Prehľad',
      },
      {
        path: `/my-cats/new-cat`,
        name: title,
      },
    ];
  }, [createCat]);

  return (
    <Layout>
      <Header title={getTitle(title)} />
      <Sidebar />
      <Container>
        <Center>
          <Title title={title} />
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <CatForm handleSubmit1={handleSubmit1} submitText={title} />
        </Center>
      </Container>
    </Layout>
  );
}
