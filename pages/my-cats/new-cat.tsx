import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';
import CatForm from '../../components/cat-form';
import {
  AddCatMutation,
  AddCatMutationVariables,
  AddReviewBulkMutation,
  AddReviewBulkMutationVariables,
  AddReviewHistoryBulkMutation,
  AddReviewHistoryBulkMutationVariables,
  AddReviewMutation,
  AddReviewMutationVariables,
  Cat_Insert_Input,
  Cat_Set_Input,
  ReviewHistory_Insert_Input,
  Review_Insert_Input,
  UpdateCatMutation,
  UpdateCatMutationVariables,
  useGetCatByIdQuery,
  useGetProductsQuery,
} from '../../graphql/generated/graphql';
import {
  ADD_CAT,
  UPDATE_CAT,
  ADD_REVIEW,
  ADD_REVIEW_HISTORY,
  ADD_REVIEW_BULK,
  ADD_REVIEW_HISTORY_BULK,
} from '../../graphql/mutations';
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
import { CATS_QUERY, USER_STATS_QUERY } from '../../graphql/queries';
import { getUser } from '../../utils/user';
import { useRouter } from 'next/router';
import ErrorScreen from '../../components/error-screen';
import Loading from '../../components/loading';
import { GeneralError } from '../../components/error-screen';

export default function CreateCat() {
  const router = useRouter();
  const { id } = router.query;

  const editOrAdd = () => {
    if (id) {
      return true;
    } else {
      return false;
    }
  };

  const ProductsToForm = () => {
    const {
      data: productData,
      error: productError,
      loading: productLoading,
    } = useGetProductsQuery();

    return (
      <Center>
        {productLoading && <Loading />}
        {productError && (
          <ErrorScreen error={GeneralError.fromApolloError(productError)} />
        )}
        <Title title={title} />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {productData && (
          <CatForm
            handleSubmit1={handleSubmit1}
            submitText={title}
            products={productData.products}
          />
        )}
      </Center>
    );
  };
  const CatById = () => {
    const {
      data: catData,
      error: catError,
      loading: catLoading,
    } = useGetCatByIdQuery({
      variables: {
        limit: 5,
        withProducts: true,
        id: Number(id),
      },
    });

    return (
      <Center>
        {catLoading && <Loading />}
        {catError && (
          <ErrorScreen error={GeneralError.fromApolloError(catError)} />
        )}
        <Title title={title} />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {catData && (
          <CatForm
            handleSubmit1={handleSubmit1}
            submitText={title}
            catData={catData.cat}
          />
        )}
      </Center>
    );
  };

  const [createCat, { error, loading, data }] =
    useMutation<AddCatMutation, AddCatMutationVariables>(ADD_CAT);

  const [updateCat, { loading: updateCatLoading }] =
    useMutation<UpdateCatMutation, UpdateCatMutationVariables>(UPDATE_CAT);

  const [createBulkReview] =
    useMutation<AddReviewBulkMutation, AddReviewBulkMutationVariables>(
      ADD_REVIEW_BULK
    );

  const [createBulkReviewHistory] = useMutation<
    AddReviewHistoryBulkMutation,
    AddReviewHistoryBulkMutationVariables
  >(ADD_REVIEW_HISTORY_BULK);

  const createNewCat = useCallback(
    async (catData: Cat_Insert_Input, reviewData) => {
      const variables: AddCatMutationVariables = {
        cat: {
          name: catData.name || '',
          age: catData.age ?? null,
          user_id: catData.user_id,
          doctor_email: catData.doctor_email ?? null,
          nickname: catData.nickname ?? null,
          weight: catData.weight ?? null,
          type: catData.type ?? null,
          note: catData.note ?? null,
          color: catData.color ?? null,
          daily_food: catData.daily_food ?? null,
          image_url: catData.image_url ?? null,
        },
      };

      const reviewFactory = (
        cat_id: number,
        product_id: number,
        review_type: string
      ) => {
        return {
          cat_id,
          product_id,
          review_type,
        };
      };

      try {
        const result = await createCat({
          variables,
          refetchQueries: [
            {
              query: CATS_QUERY,
              variables: {
                withProducts: true,
                user_id: getUser(),
                limit: 2,
              },
            },
            {
              query: USER_STATS_QUERY,
              variables: {
                user_id: getUser(),
              },
            },
          ],
        });
        if (result.data?.insert_Cat?.returning) {
          const reviews: Review_Insert_Input = reviewData.map((item) => {
            return reviewFactory(
              result.data?.insert_Cat?.returning.map((item) => item.id)[0],
              item.product.id,
              String(item.rating.value)
            );
          });

          const reviewsHistory: ReviewHistory_Insert_Input = reviewData.map(
            (item) => {
              return reviewFactory(
                result.data?.insert_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating.value)
              );
            }
          );

          const reviewVariables: AddReviewBulkMutationVariables = {
            reviews: reviews,
          };

          const resultReview = await createBulkReview({
            variables: reviewVariables,
          });

          const resultReviewHistory = await createBulkReviewHistory({
            variables: {
              review_history: reviewsHistory,
            },
          });
          if (
            resultReview.data?.insert_Review?.returning &&
            resultReviewHistory.data?.insert_ReviewHistory?.returning
          ) {
            return true;
          }
        } else {
          console.log(error);
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    [createCat]
  );

  const updateMyCat = useCallback(
    async (catData: Cat_Set_Input) => {
      const setCatInput: Cat_Set_Input = {
        name: catData.name || '',
        age: catData.age ?? null,
        user_id: catData.user_id,
        doctor_email: catData.doctor_email ?? null,
        nickname: catData.nickname ?? null,
        weight: catData.weight ?? null,
        type: catData.type ?? null,
        note: catData.note ?? null,
        color: catData.color ?? null,
        daily_food: catData.daily_food ?? null,
        id: catData.id,
      };

      try {
        const result = await updateCat({
          variables: {
            cats: setCatInput,
            id: catData.id,
          },
        });
        if (result.data?.update_Cat.returning) {
          return true;
        } else {
          console.log(error);
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    [updateCat]
  );

  const handleSubmit1 = useCallback(
    async (catData: Cat_Insert_Input | Cat_Set_Input, reviewData) => {
      if (editOrAdd()) {
        return updateMyCat(catData);
      } else {
        return createNewCat(catData, reviewData);
      }
    },
    [createNewCat, updateMyCat]
  );

  const editOrAddStrings = {
    title: [`Pridať novú mačku`, `Upraviť mačku`],
    name: ['Prehľad', 'Moje mačky'],
    path: ['/', '/my-cats'],
    path2: ['/my-cats/new-cat', '/my-cats/[:id]'],
  };

  const chooseString = (type: boolean, key: string) =>
    type ? editOrAddStrings[key][1] : editOrAddStrings[key][0];

  const title = chooseString(editOrAdd(), 'title');

  const breadcrumbs: Breadcrumb[] = useMemo(() => {
    return [
      {
        path: chooseString(editOrAdd(), 'path'),
        name: chooseString(editOrAdd(), 'name'),
      },
      {
        path: chooseString(editOrAdd(), 'path2'),
        name: title,
      },
    ];
  }, [createCat, updateCat]);

  return (
    <Layout>
      <Header title={getTitle(title)} />
      <Sidebar />
      <Container>{editOrAdd() ? <CatById /> : <ProductsToForm />}</Container>
    </Layout>
  );
}
