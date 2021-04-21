import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './submit-button';
import { useMutation } from '@apollo/client';
import {
  AddReviewMutation,
  AddReviewMutationVariables,
  GetDashboardQuery,
  Review_Insert_Input,
  SelectCatFieldsFragment,
  SelectProductFieldsFragment,
} from '../graphql/generated/graphql';
import Select from 'react-select';
import NeutralButton from './neutral-button';
import { ADD_REVIEW } from '../graphql/mutations';
import { DASHBOARD_QUERY } from '../graphql/queries';

interface AddProductReviewFormProps {
  selectCats: GetDashboardQuery['selectCats'];
  selectProducts: GetDashboardQuery['selectProducts'];
  onBackAction: () => void;
  onSuccess: () => void;
}

const AddProductReviewForm = ({
  selectCats,
  selectProducts,
  onBackAction,
  onSuccess,
}: AddProductReviewFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [createReview, { error, loading, data }] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(ADD_REVIEW, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });

  const onSubmit = (data: any) => {
    const reviewInput: Review_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: data.rating.value.toString(),
    };

    createReview({ variables: { review: reviewInput } }).then((data) => {
      onSuccess();
      onBackAction();
    });
  };

  interface RatingOption {
    value: number;
    label: string;
  }

  const ratingOptions = [
    { value: 1, label: '1 (Najhoršie)' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5 (Najlepšie)' },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
      color: state.isSelected ? 'white' : '#3E3E70',
      background: state.isSelected ? '#BDBDE7' : 'white',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition, outline };
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div
        className={`mb-3 mt-2 text-purple block border-rounded-base
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray`}
      >
        <Controller
          name="product"
          control={control}
          render={({ field }) => (
            <Select<SelectProductFieldsFragment>
              {...field}
              styles={customStyles}
              options={selectProducts.slice(0, 100)}
              getOptionValue={(product: SelectProductFieldsFragment) =>
                product.id.toString()
              }
              getOptionLabel={(product: SelectProductFieldsFragment) =>
                product.name
              }
            />
          )}
        />
      </div>
      <div className="flex justify-between">
        <div
          className={`mb-3 mt-2 text-purple block border-rounded-base
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray w-1/2 mr-5`}
        >
          <Controller
            name="cat"
            control={control}
            styles={customStyles}
            render={({ field }) => (
              <Select<SelectCatFieldsFragment>
                {...field}
                options={selectCats}
                getOptionValue={(cat: SelectCatFieldsFragment) =>
                  cat.id.toString()
                }
                getOptionLabel={(cat: SelectCatFieldsFragment) => cat.name}
              />
            )}
          />
        </div>
        <div
          className={`mb-3 mt-2 text-purple block border-rounded-base
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray w-1/2`}
        >
          <Controller
            name="rating"
            control={control}
            styles={customStyles}
            render={({ field }) => (
              <Select<RatingOption> {...field} options={ratingOptions} />
            )}
          />
        </div>
      </div>

      <NeutralButton title="Spet" onClick={onBackAction} />
      <SubmitButton text="Uložiť" />
    </form>
  );
};

export default AddProductReviewForm;
