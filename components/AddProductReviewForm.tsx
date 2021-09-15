import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';
import { useMutation } from '@apollo/client';
import FormErrorMessage from './FormErrorMessage';
import {
  AddReviewHistoryMutation,
  AddReviewHistoryMutationVariables,
  AddReviewMutation,
  AddReviewMutationVariables,
  GetDashboardQuery,
  ReviewHistory_Insert_Input,
  Review_Insert_Input,
  SelectCatFieldsFragment,
  SelectProductFieldsFragment,
} from '../graphql/generated/graphql';
import Select, { components } from 'react-select';
import NeutralButton from './NeutralButton';
import { ADD_REVIEW, ADD_REVIEW_HISTORY } from '../graphql/mutations';
import {
  CATS_DETAIL_QUERY,
  CATS_QUERY,
  DASHBOARD_QUERY,
  REVIEWS_QUERY,
  USER_STATS_QUERY,
} from '../graphql/queries';
import FormInputLabel from './FormInputLabel';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import { getUser } from '../utils/user';
import { TIP_LIMIT } from '../utils/constants';
import { customStyles as style } from '../utils/formStyles';
import useSearch from '../hooks/useSearch';
import ProductController from './ProductController';
import RatingController from './RatingController';
import DateFormatObject from '../utils/getFormatDate';
import { Components } from 'react-select/src/components';
import RatingIcon from './RatingIcon';
import useLogger from '../hooks/useLogger';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

interface AddProductReviewFormProps {
  selectCats?: GetDashboardQuery['selectCats'];

  selectProducts: GetDashboardQuery['selectProducts'];
  onBackAction?: () => void;
  onSuccess?: () => void;
  props?: Array<string>;
  index?: number;
}

const Option: Components['Option'] = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="mr-3 flex flex-row items-center cursor-pointer h-1 py-3">
        <img
          src={props.data.image_url || defaultImage}
          className="object-cover h-10 w-10 mr-4 float-right rounded-full py-0"
        />

        {children}
      </div>
    </components.Option>
  );
};

const AddProductReviewForm = ({
  selectCats,
  selectProducts,
  onBackAction,
  onSuccess,
  props,
  index,
}: AddProductReviewFormProps) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(rating);
  };

  const [reviewType, setReviewType] = useState<string>('');

  const onSaveRating = useCallback(
    (index) => {
      setRating(index);
    },
    [rating, hoverRating, reviewType]
  );

  const [createReview] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(ADD_REVIEW);

  const [createReviewHistory] = useMutation<
    AddReviewHistoryMutation,
    AddReviewHistoryMutationVariables
  >(ADD_REVIEW_HISTORY);
  const lastWeek = DateFormatObject().lastWeek();
  const logger = useLogger();

  const onSubmit = (data: any) => {
    const reviewInput: Review_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: String(data.rating),
    };

    const reviewHistoryInput: ReviewHistory_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: data.rating,
    };

    createReviewHistory({
      variables: { review_history: reviewHistoryInput },
    });

    createReview({
      variables: { review: reviewInput },
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
            limitProducts: 5,
            brand_type: 'Feringa',
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
      // update: (store, { data }) => {
      //   const reviewsData = store.readQuery({
      //     query: DASHBOARD_QUERY,
      //     variables: {
      //       limitTips: TIP_LIMIT,
      //       user_id: getUser(),
      //     },
      //   });

      //   const catData = store.readQuery({
      //     query: CATS_QUERY,
      //     variables: {
      //       user_id: getUser(),
      //       withProducts: true,
      //     },
      //   });

      //   store.writeQuery({
      //     query: DASHBOARD_QUERY,
      //     variables: {
      //       limitTips: TIP_LIMIT,
      //       user_id: getUser(),
      //     },
      //     data: {
      //       reviews: [
      //         ...reviewsData.reviews,
      //         ...data!.insert_Review?.returning,
      //       ],
      //     },
      //   });

      //   const newCats = catData.cats.map((cat) => {
      //     const reviews = data!.insert_Review?.returning.filter(
      //       (review) => review.cat.id === cat.id
      //     );

      //     return { ...cat, reviews: { ...cat.reviews, ...reviews } };
      //   });

      //   store.writeQuery({
      //     query: CATS_QUERY,
      //     variables: {
      //       user_id: getUser(),
      //       withProducts: true,
      //     },
      //     data: {
      //       ...catData,
      //       cats: newCats,
      //     },
      //   });
      // },
    })
      .then((data) => {
        // onSuccess();
        onBackAction();
      })
      .catch((err) => logger(err));
  };

  interface RatingOption {
    value: number;
    label: string;
  }

  const customStyles = style;

  const [searchProducts, setSearchProducts] = useState<
    Array<SelectProductFieldsFragment>
  >([]);
  const [searchTerm, setSearchTerm] = useState('');

  const productsCopy = [...selectProducts];
  const productInput = 'product';
  const watchedProduct: SelectProductFieldsFragment = watch(productInput);
  const catInput = 'cat';
  const watchedCat: SelectCatFieldsFragment = watch(catInput);
  const watchedReview: RatingOption = watch('rating');

  useSearch(searchTerm, productsCopy, setSearchProducts);

  useEffect(() => {
    handleReviewCombination(watchedCat, watchedProduct);
  }, [watchedCat, watchedProduct, watchedReview, reviewType]);

  const handleReviewCombination = (
    cat: SelectCatFieldsFragment,
    product: SelectProductFieldsFragment
  ) => {
    if (cat && product) {
      setReviewType(
        String(
          cat.reviews.filter((item) => item.product_id === product.id).pop()
            ?.review_type || ''
        )
      );
    }
  };
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-2 mt-4">
        <div className="w-full">
          <ProductController
            searchProducts={searchProducts}
            watchedProduct={watchedProduct}
            onInputChange={(e) => {
              setSearchTerm(e);
            }}
            name="product"
            errors={errors}
            control={control}
            showHint={true}
            defaultValue={index >= 0 && index <= 5 && productsCopy[index]}
            isDisabled={productsCopy[index] ? true : false}
          />
        </div>
      </div>
      <div className="flex xl-custom:flex-col justify-between">
        <div className="w-full mb-4">
          <div className="mb-2">
            <FormInputLabel name={`${t(cs['cat'])}*`} />
          </div>
          <Controller
            name="cat"
            control={control}
            rules={{ required: true }}
            defaultValue={selectCats[0]}
            render={({ field }) => (
              <Select<SelectCatFieldsFragment>
                {...field}
                styles={customStyles}
                options={selectCats}
                {...props}
                components={{ Option }}
                getOptionValue={(cat: SelectCatFieldsFragment) =>
                  cat.id.toString()
                }
                getOptionLabel={(cat: SelectCatFieldsFragment) => cat.name}
                placeholder={t(cs['choose_cat'])}
                noOptionsMessage={() => t(cs['no_results'])}
                isDisabled={selectCats.length === 1 ? true : false}
              />
            )}
          />
        </div>
        <div className="w-full mb-3">
          <div className="mb-2">
            <FormInputLabel name={`${t(cs['review'])}*`} />
          </div>
          <Controller
            name="rating"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <span className="mr-1">
                      <RatingIcon
                        index={index}
                        rating={reviewType !== '' ? Number(reviewType) : value}
                        hoverRating={
                          reviewType !== '' ? Number(reviewType) : value
                        }
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onSaveRating={onChange}
                        isDisabled={reviewType !== ''}
                      />
                    </span>
                  );
                })}
              </div>
            )}
          />
          {errors.rating && reviewType === '' && (
            <div className="mt-3">
              <FormErrorMessage error={t(cs['review_required'])} />
            </div>
          )}
        </div>
      </div>

      {reviewType !== '' ? (
        <span className="flex text-red-500 mb-5">
          {`${t(cs['for_cat'])} ${watchedCat.name} ${t(cs['and_food'])} ${
            watchedProduct.name
          } ${t(cs['review_exists'])} ${reviewType}.`}
        </span>
      ) : null}

      <div className="mt-1">
        <NeutralButton title={t(cs['back'])} onClick={onBackAction} />
        <SubmitButton
          text={t(cs['save'])}
          disabled={reviewType !== ''}
          size="w-full xl-custom:w-1/4"
        />
      </div>
    </form>
  );
};

export default AddProductReviewForm;
