import React, { useEffect, useState } from 'react';
import { getUser } from '../utils/user';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import FormErrorMessage from './FormErrorMessage';
import FormInputLabel from './FormInputLabel';
import SubmitButton from './SubmitButton';
import NeutralButton from './NeutralButton';
import { useMutation } from '@apollo/client';
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
import { ADD_REVIEW, ADD_REVIEW_HISTORY } from '../graphql/mutations';
import Select, { components } from 'react-select';
import { customStyles as style } from '../utils/formStyles';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import useSearch from '../hooks/useSearch';
import ProductController from './ProductController';
import { Components } from 'react-select/src/components';
import RatingIcon from './RatingIcon';
import useLogger from '../hooks/useLogger';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import { getRefetchQueries } from '../graphql/refetchQueries';

interface ReviewSubmissionTypeForm extends FieldValues {
  cat: SelectCatFieldsFragment;
  product: SelectProductFieldsFragment;
  rating: string;
}

type CatSelectOptions = {
  id: SelectCatFieldsFragment['id'];
  name: SelectCatFieldsFragment['name'];
  image_url: SelectCatFieldsFragment['image_url'];
  reviews: SelectCatFieldsFragment['reviews'];
};

interface AddProductReviewFormProps {
  selectCats?: Array<CatSelectOptions>;
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
  props,
  index,
}: AddProductReviewFormProps): JSX.Element => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ReviewSubmissionTypeForm>();
  const [reviewType, setReviewType] = useState<string>('');
  const [searchProducts, setSearchProducts] = useState<
    Array<SelectProductFieldsFragment>
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const refetchQueries = getRefetchQueries(getUser(), [
    'DASHBOARD_QUERY',
    'CATS_DETAIL_QUERY',
    'CATS_QUERY',
    'REVIEWS_QUERY',
    'USER_STATS_QUERY',
  ]);
  const customStyles = style;
  const productsCopy = [...selectProducts];
  const productInput = 'product';
  const watchedProduct: SelectProductFieldsFragment = watch(productInput);
  const catInput = 'cat';
  const watchedCat: SelectCatFieldsFragment = watch(catInput);
  const watchedReview: string = watch('rating');
  useSearch(searchTerm, productsCopy, setSearchProducts);
  const logger = useLogger();
  const { t } = useTranslation();
  const [createReview] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(ADD_REVIEW);

  const [createReviewHistory] = useMutation<
    AddReviewHistoryMutation,
    AddReviewHistoryMutationVariables
  >(ADD_REVIEW_HISTORY);

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

  useEffect(() => {
    handleReviewCombination(watchedCat, watchedProduct);
  }, [watchedCat, watchedProduct, watchedReview, reviewType]);

  const onSubmit: SubmitHandler<ReviewSubmissionTypeForm> = (data) => {
    const reviewInput: Review_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: String(data.rating),
    };

    const reviewHistoryInput: ReviewHistory_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: Number(data.rating),
    };

    createReviewHistory({
      variables: { review_history: reviewHistoryInput },
    });

    createReview({
      variables: { review: reviewInput },
      refetchQueries: refetchQueries,
    })
      .then(() => {
        onBackAction();
      })
      .catch((err) => logger(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-2 mt-4">
        <div className="w-full">
          <ProductController
            name={'product'}
            searchProducts={searchProducts}
            onInputChange={(e) => {
              setSearchTerm(e);
            }}
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
                    <span className="mr-1" key={index}>
                      <RatingIcon
                        index={index}
                        rating={
                          reviewType !== '' ? Number(reviewType) : Number(value)
                        }
                        handleOnSaveRating={onChange}
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
