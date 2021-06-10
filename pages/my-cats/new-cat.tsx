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
  DeleteReviewMutation,
  DeleteReviewMutationVariables,
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
  DELETE_REVIEW,
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
import {
  CATS_DETAIL_QUERY,
  CATS_QUERY,
  DASHBOARD_QUERY,
  REVIEWS_QUERY,
  USER_STATS_QUERY,
} from '../../graphql/queries';
import { getUser } from '../../utils/user';
import { useRouter } from 'next/router';
import ErrorScreen from '../../components/error-screen';
import Loading from '../../components/loading';
import { GeneralError } from '../../components/error-screen';
import { TIP_LIMIT } from '../../utils/constants';

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

    const { data: productData } = useGetProductsQuery();

    return (
      <Center>
        {catLoading && <Loading />}
        {catError && (
          <ErrorScreen error={GeneralError.fromApolloError(catError)} />
        )}
        <Title title={title} />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {catData && productData && (
          <CatForm
            handleSubmit1={handleSubmit1}
            submitText={title}
            catData={catData.cat}
            products={productData.products}
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

  const [deleteReview] =
    useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(
      DELETE_REVIEW
    );

  const [createBulkReviewHistory] = useMutation<
    AddReviewHistoryBulkMutation,
    AddReviewHistoryBulkMutationVariables
  >(ADD_REVIEW_HISTORY_BULK);

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

  const createNewCat = useCallback(
    async (catData: Cat_Insert_Input, reviewData, reviewUpdatedData) => {
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

      try {
        const result = await createCat({
          variables,
          refetchQueries: [
            {
              query: DASHBOARD_QUERY,
              variables: {
                limitTips: TIP_LIMIT,
                user_id: getUser(),
              },
            },
            {
              query: CATS_DETAIL_QUERY,
              variables: {
                user_id: getUser(),
                limit: 5,
                withProducts: true,
              },
            },
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
            {
              query: REVIEWS_QUERY,
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
            refetchQueries: [
              {
                query: DASHBOARD_QUERY,
                variables: {
                  limitTips: TIP_LIMIT,
                  user_id: getUser(),
                },
              },
              {
                query: CATS_DETAIL_QUERY,
                variables: {
                  user_id: getUser(),
                  limit: 5,
                  withProducts: true,
                },
              },
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
    async (catData: Cat_Set_Input, reviewData, reviewUpdatedData) => {
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
          refetchQueries: [
            {
              query: DASHBOARD_QUERY,
              variables: {
                limitTips: TIP_LIMIT,
                user_id: getUser(),
              },
            },
            {
              query: CATS_DETAIL_QUERY,
              variables: {
                user_id: getUser(),
                limit: 5,
                withProducts: true,
              },
            },
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
            {
              query: REVIEWS_QUERY,
              variables: {
                user_id: getUser(),
              },
            },
          ],
        });
        if (result.data?.update_Cat.returning) {
          const reviews: Review_Insert_Input =
            reviewUpdatedData.merged &&
            reviewUpdatedData.merged.map((item) => {
              return reviewFactory(
                result.data?.update_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating.value)
              );
            });

          const reviewsHistory: ReviewHistory_Insert_Input =
            reviewUpdatedData.merged &&
            reviewUpdatedData.merged.map((item) => {
              return reviewFactory(
                result.data?.update_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating.value)
              );
            });
          const reviewVariables: AddReviewBulkMutationVariables = {
            reviews: reviews,
          };
          const resultReview = await createBulkReview({
            variables: reviewVariables,
            refetchQueries: [
              {
                query: DASHBOARD_QUERY,
                variables: {
                  limitTips: TIP_LIMIT,
                  user_id: getUser(),
                },
              },
              {
                query: CATS_DETAIL_QUERY,
                variables: {
                  user_id: getUser(),
                  limit: 5,
                  withProducts: true,
                },
              },
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
              {
                query: REVIEWS_QUERY,
                variables: {
                  user_id: getUser(),
                },
              },
            ],
          });

          const resultReviewHistory = await createBulkReviewHistory({
            variables: {
              review_history: reviewsHistory,
            },
            refetchQueries: [
              {
                query: DASHBOARD_QUERY,
                variables: {
                  limitTips: TIP_LIMIT,
                  user_id: getUser(),
                },
              },
              {
                query: CATS_DETAIL_QUERY,
                variables: {
                  user_id: getUser(),
                  limit: 5,
                  withProducts: true,
                },
              },
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
              {
                query: REVIEWS_QUERY,
                variables: {
                  user_id: getUser(),
                },
              },
            ],
          });

          const deletedReviews =
            reviewUpdatedData.deleted &&
            reviewUpdatedData.deleted.map((item) => {
              return reviewFactory(
                result.data?.update_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating.value)
              );
            });

          console.log(deletedReviews);
          const deleteOneByOne = (reviews) => {
            for (const review of reviews) {
              deleteReview({
                variables: {
                  cat_id: review.cat_id,
                  product_id: review.product_id,
                },
                refetchQueries: [
                  {
                    query: DASHBOARD_QUERY,
                    variables: {
                      limitTips: TIP_LIMIT,
                      user_id: getUser(),
                    },
                  },
                  {
                    query: CATS_DETAIL_QUERY,
                    variables: {
                      user_id: getUser(),
                      limit: 5,
                      withProducts: true,
                    },
                  },
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
                  {
                    query: REVIEWS_QUERY,
                    variables: {
                      user_id: getUser(),
                    },
                  },
                ],
              }).then((data) => data.data.delete_Review.returning);
            }
          };

          const deleteResult = await deleteOneByOne(deletedReviews);

          if (
            resultReview.data?.insert_Review?.returning &&
            resultReviewHistory.data?.insert_ReviewHistory?.returning
          ) {
            return true;
          }
          if (deleteResult) {
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
    [updateCat]
  );

  const handleSubmit1 = useCallback(
    async (
      catData: Cat_Insert_Input | Cat_Set_Input,
      reviewData,
      reviewUpdatedData
    ) => {
      if (editOrAdd()) {
        return updateMyCat(catData, reviewData, reviewUpdatedData);
      } else {
        return createNewCat(catData, reviewData, reviewUpdatedData);
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
