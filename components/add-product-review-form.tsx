import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './submit-button';
import { gql, useMutation } from '@apollo/client';
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

export const SelectProductFields = gql`
  fragment SelectProductFields on Product {
    id
    name
    brand_type
    image_url
  }
`;

export const SelectCatFields = gql`
  fragment SelectCatFields on Cat {
    id
    name
    image_url
  }
`;

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
  >(ADD_REVIEW);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Controller
        name="product"
        control={control}
        render={({ field }) => (
          <Select<SelectProductFieldsFragment>
            {...field}
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

      <Controller
        name="cat"
        control={control}
        render={({ field }) => (
          <Select<SelectCatFieldsFragment>
            {...field}
            options={selectCats}
            getOptionValue={(cat: SelectCatFieldsFragment) => cat.id.toString()}
            getOptionLabel={(cat: SelectCatFieldsFragment) => cat.name}
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Select<RatingOption> {...field} options={ratingOptions} />
        )}
      />

      <NeutralButton title="Zpět" onClick={onBackAction} />
      <SubmitButton text="Uložiť" />
    </form>
  );
};

export default AddProductReviewForm;
