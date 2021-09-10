import { useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CatForm, { CAT_TYPE_NULL } from '../../components/CatForm';
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
  useGetCatByIdLazyQuery,
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
import Container from '../../components/Container';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Center from '../../components/CenterContainer';
import Header from '../../components/Head';
import getTitle from '../../utils/getTitle';
import Title from '../../components/Title';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Breadcrumbs from '../../components/Breadcrumbs';
import Breadcrumb from '../../utils/breadcrumb';
import setUppercaseTitle from '../../utils/setUppercaseTitle';
import {
  CATS_DETAIL_QUERY,
  CATS_QUERY,
  DASHBOARD_QUERY,
  REVIEWS_QUERY,
  USER_STATS_QUERY,
} from '../../graphql/queries';
import { getUser } from '../../utils/user';
import { useRouter } from 'next/router';
import ErrorScreen from '../../components/ErrorScreen';
import Loading from '../../components/Loading';
import { GeneralError } from '../../components/ErrorScreen';
import { TIP_LIMIT } from '../../utils/constants';
import DateFormatObject from '../../utils/getFormatDate';
import links from '../../utils/backlinks';
import useLocalStorage, { LocalStorageKey } from '../../hooks/useLocalStorage';
import useLogger from '../../hooks/useLogger';

interface CreateCatProps {
  onClickTrigger?: () => void;
}
export default function CreateCat({ onClickTrigger }: CreateCatProps) {
  const router = useRouter();
  const { id } = router.query;

  const isEditCat = () => {
    // can also be written as !!id
    if (id) {
      return true;
    } else {
      return false;
    }
  };

  const CreateCatForm = () => {
    const {
      data: productData,
      error: productError,
      loading: productLoading,
    } = useGetProductsQuery({ skip: isSaving });

    return (
      <Center>
        {productLoading && <Loading />}
        {productError && (
          <ErrorScreen error={GeneralError.fromApolloError(productError)} />
        )}
        <Title title={title} />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {productData ? (
          <CatForm
            handleSubmit1={handleSubmit1}
            submitText={title}
            products={productData.products}
          />
        ) : (
          <Loading />
        )}
      </Center>
    );
  };

  let numberPattern = /\d+/g;
  const [isSaving, setIsSaving] = useState(false);
  let [, setSavedCat] = useLocalStorage(LocalStorageKey.SELECTED_CAT, 0);

  const EditCatForm = () => {
    const {
      data: catData,
      error: catError,
      loading: catLoading,
    } = useGetCatByIdQuery({
      variables: {
        limit: 5,
        withProducts: true,
        id: Number(String(id).match(numberPattern)),
      },
      skip: isSaving,

      // pollInterval: 500,
    });

    const {
      data: productData,
      loading: productLoading,
      error: productError,
    } = useGetProductsQuery({
      skip: isSaving,
      // pollInterval: 500,
    });

    return (
      <Center>
        {catLoading && productLoading && <Loading />}
        {catError && productError && (
          <ErrorScreen
            error={GeneralError.fromApolloError(catError || productError)}
          />
        )}
        <Title title={title} />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {catData && productData ? (
          <CatForm
            handleSubmit1={handleSubmit1}
            submitText={title}
            catData={catData.cat}
            products={productData.products}
          />
        ) : (
          <Loading />
        )}
      </Center>
    );
  };

  const [createCat, { error, loading, data }] = useMutation<
    AddCatMutation,
    AddCatMutationVariables
  >(ADD_CAT);

  const logger = useLogger();

  const [updateCat, { loading: updateCatLoading }] = useMutation<
    UpdateCatMutation,
    UpdateCatMutationVariables
  >(UPDATE_CAT);

  const lastWeek = DateFormatObject().lastWeek();

  const [createBulkReview] = useMutation<
    AddReviewBulkMutation,
    AddReviewBulkMutationVariables
  >(ADD_REVIEW_BULK);

  const [deleteReview] = useMutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DELETE_REVIEW);

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
          name: setUppercaseTitle(catData.name) || '',
          age: catData.age ?? null,
          user_id: catData.user_id,
          doctor_email: catData.doctor_email ?? null,
          gender: catData.gender ?? null,
          weight: catData.weight ?? null,
          type: catData.type ?? null,
          note: catData.note ?? null,
          color: catData.color ?? null,
          daily_food: catData.daily_food ?? null,
          image_url: catData.image_url ?? null,
        },
      };

      try {
        setIsSaving(true);
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
              query: CATS_DETAIL_QUERY,
              variables: {
                user_id: getUser(),
                limit: 5,
                withProducts: true,
              },
            },
            {
              query: USER_STATS_QUERY,
              variables: {
                user_id: getUser(),
                updated_at: lastWeek,
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
        if (result.data?.insert_Cat?.returning[0].id) {
          const reviews: Review_Insert_Input = reviewData.map((item) => {
            return reviewFactory(
              result.data?.insert_Cat?.returning.map((item) => item.id)[0],
              item.product.id,
              String(item.rating)
            );
          });

          const reviewsHistory: ReviewHistory_Insert_Input = reviewData.map(
            (item) => {
              return reviewFactory(
                result.data?.insert_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating)
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
                  updated_at: lastWeek,
                },
              },
            ],
          });

          setSavedCat(result.data?.insert_Cat?.returning[0].id ?? 0);

          if (
            resultReview.data?.insert_Review?.returning &&
            resultReviewHistory.data?.insert_ReviewHistory?.returning
          ) {
            return true;
          }
        } else {
          logger(GeneralError.fromApolloError(error));
          return false;
        }
      } catch (e) {
        logger(e);
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
        gender: catData.gender ?? null,
        weight: catData.weight ?? null,
        type: catData.type ?? null,
        note: catData.note ?? null,
        color: catData.color ?? null,
        daily_food: catData.daily_food ?? null,
        id: catData.id,
        image_url: catData.image_url ?? null,
      };

      try {
        setIsSaving(true);
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
                updated_at: lastWeek,
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
        if (result.data?.update_Cat.returning[0].id) {
          const reviews: Review_Insert_Input =
            reviewUpdatedData.merged &&
            reviewUpdatedData.merged.map((item) => {
              return reviewFactory(
                result.data?.update_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating)
              );
            });

          const reviewsHistory: ReviewHistory_Insert_Input =
            reviewUpdatedData.merged &&
            reviewUpdatedData.merged.map((item) => {
              return reviewFactory(
                result.data?.update_Cat?.returning.map((item) => item.id)[0],
                item.product.id,
                String(item.rating)
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
                  updated_at: lastWeek,
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
                  updated_at: lastWeek,
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
                String(item.rating)
              );
            });

          const deleteResult = await Promise.all(
            deletedReviews.map((review) => {
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
                      updated_at: lastWeek,
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
            })
          ).then(() => {
            return true;
          });

          if (
            (resultReview.data?.insert_Review?.returning &&
              resultReviewHistory.data?.insert_ReviewHistory?.returning) ||
            deleteResult
          ) {
            return true;
          }
        } else {
          logger(GeneralError.fromApolloError(error));
          return false;
        }
      } catch (e) {
        logger(e);
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
      if (isEditCat()) {
        return await updateMyCat(catData, reviewData, reviewUpdatedData);
      } else {
        return await createNewCat(catData, reviewData, reviewUpdatedData);
      }
    },
    [createNewCat, updateMyCat, isSaving, isEditCat]
  );

  const title = isEditCat() ? links.edit_cat.name : links.create_cat.name;

  const breadcrumbs: Breadcrumb[] = useMemo(() => {
    const { backlink } = router.query;
    let previousLink = links.dashboard;
    if (backlink) {
      previousLink = links[backlink as string] ?? previousLink;
    }
    let currentLink = isEditCat() ? links.edit_cat : links.create_cat;
    return [
      {
        path: previousLink.path,
        name: previousLink.name,
      },
      {
        path: currentLink.path,
        name: currentLink.name,
      },
    ];
  }, [createCat, updateCat, router]);

  return (
    <Layout>
      <Header title={getTitle(title)} />
      <Sidebar />

      <Container>{isEditCat() ? <EditCatForm /> : <CreateCatForm />}</Container>
    </Layout>
  );
}
