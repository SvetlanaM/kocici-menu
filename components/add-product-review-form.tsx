import React, { useEffect, useState } from 'react';
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
import { CATS_QUERY, DASHBOARD_QUERY } from '../graphql/queries';

import FormSelectBox from './form-select-box';

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
    watch,
    register,
  } = useForm();

  const [createReview, { error, loading, data }] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(ADD_REVIEW, {
    refetchQueries: [{ query: DASHBOARD_QUERY }],
  });

  const onSubmit = (data: any) => {
    console.log(data);
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

      return { ...provided, opacity, transition };
    },
  };

  const [searchProducts, setSearchProducts] = useState<
    Array<SelectProductFieldsFragment>
  >([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [reviewType, setReviewType] = useState<string>('');
  const productsCopy = [...selectProducts];
  const productInput = 'product';
  const watchedProduct: SelectProductFieldsFragment = watch(productInput);
  const catInput = 'cat';
  const watchedCat: SelectCatFieldsFragment = watch(catInput);
  const watchedReview: RatingOption = watch('rating');

  useEffect(() => {
    if (searchTerm.length > 3) {
      const results = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      if (results.length > 1000) {
        setSearchProducts([]);
      } else {
        setSearchProducts(results);
      }
    } else {
      setSearchProducts([]);
    }
  }, [searchTerm]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div
        className={`mb-3 mt-2 text-purple block border-rounded-base
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray`}
      >
        <Controller
          render={({ field, fieldState }) => (
            <Select<SelectProductFieldsFragment>
              {...field}
              {...fieldState}
              styles={customStyles}
              options={searchProducts}
              getOptionValue={(product: SelectProductFieldsFragment) =>
                product.id.toString()
              }
              getOptionLabel={(product: SelectProductFieldsFragment) =>
                product.name
              }
              onInputChange={(e) => {
                setSearchTerm(e);
              }}
              placeholder="Vyhladajte nazov produktu od 3 znakov"
              value={watchedProduct}
              noOptionsMessage={() => 'Ziadne dalsie vysledky'}
            />
          )}
          name="product"
          control={control}
          rules={{ required: true }}
          defaultValue={null}
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
            rules={{ required: true }}
            render={({ field }) => (
              <Select<SelectCatFieldsFragment>
                {...field}
                styles={customStyles}
                options={selectCats}
                getOptionValue={(cat: SelectCatFieldsFragment) =>
                  cat.id.toString()
                }
                getOptionLabel={(cat: SelectCatFieldsFragment) => cat.name}
                rules={{ required: true }}
                placeholder="Vyber macky"
                noOptionsMessage={() => 'Ziadne dalsie vysledky'}
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
            rules={{ required: true }}
            render={({ field }) => (
              <Select<RatingOption>
                {...field}
                styles={customStyles}
                options={ratingOptions}
                noOptionsMessage={() => 'Ziadne dalsie vysledky'}
                isDisabled={reviewType !== '' ? true : false}
                placeholder="Vyber hodnotenia"
              />
            )}
          />
        </div>
      </div>

      {reviewType !== '' ? (
        <span className="flex text-red-500">
          Pre macku {watchedCat.name} a krmivo {watchedProduct.name} uz mate
          vybrane hodnotenie {reviewType}
        </span>
      ) : null}

      <NeutralButton title="Spet" onClick={onBackAction} />
      <SubmitButton text="Uložiť" disabled={reviewType !== ''} />
    </form>
  );
};

export default AddProductReviewForm;
