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
import Select, { components } from 'react-select';
import NeutralButton from './neutral-button';
import { ADD_REVIEW } from '../graphql/mutations';
import { CATS_QUERY, DASHBOARD_QUERY } from '../graphql/queries';
import FormInputLabel from './form-input-label';
import { SVETA_EMAIL, TIP_LIMIT } from '../utils/constants';
import Link from 'next/link';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
interface AddProductReviewFormProps {
  selectCats: GetDashboardQuery['selectCats'];
  selectProducts: GetDashboardQuery['selectProducts'];
  onBackAction: () => void;
  onSuccess: () => void;
  props?: Array<string>;
}

const Option = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="float-left mt-0 mr-3 select-photo">
        {props.data.__typename === 'Cat' ? (
          <img
            src={props.data.image_url || defaultImage}
            className="rounded-full h-10 w-10"
          />
        ) : props.data.__typename === 'Product' ? (
          <img
            src={props.data.image_url || defaultImage}
            className="h-10 w-10"
          />
        ) : null}
      </div>
      {children}
    </components.Option>
  );
};

const AddProductReviewForm = ({
  selectCats,
  selectProducts,
  onBackAction,
  onSuccess,
  props,
}: AddProductReviewFormProps) => {
  const { handleSubmit, control, watch } = useForm();

  const [createReview] = useMutation<
    AddReviewMutation,
    AddReviewMutationVariables
  >(ADD_REVIEW);

  const onSubmit = (data: any) => {
    const reviewInput: Review_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: data.rating.value.toString(),
    };

    createReview({
      variables: { review: reviewInput },
      refetchQueries: [
        {
          query: DASHBOARD_QUERY,
          variables: {
            limitTips: TIP_LIMIT,
            user_id: 'a11d3f2b-296b-4637-807f-4c7207ab45ce',
          },
        },
      ],
    }).then((data) => {
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
    control: (styles, { isHovered, isFocused, isDisabled }) => ({
      ...styles,
      display: 'flex',
      color: '#4B4261',
      border: isHovered ? null : '1px solid #E1E5EE',
      backgroundColor: isDisabled ? 'white' : null,
      // This line disable the blue border
      boxShadow: isFocused ? '1px solid #E1E5EE' : 0,
      '&:hover': {
        border: isFocused ? null : '1px solid #B3BACC',
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const color = '#4B4261';
      return {
        ...styles,
        padding: 20,
        borderBottom: '1px solid #E1E5EE',
        color: isDisabled
          ? '#4B4261'
          : isSelected
          ? '#B3BACC'
          : isFocused
          ? '#BDBDE7'
          : '#4B4261',
        cursor: isDisabled ? 'not-allowed' : 'default',
        backgroundColor: isDisabled
          ? 'red'
          : isSelected
          ? 'white'
          : isFocused
          ? 'white'
          : null,
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? null : 'white'),
        },
      };
    },
    input: (styles, { isFocused }) => {
      return {
        ...styles,
        color: '#4B4261',
      };
    },
    placeholder: (styles) => ({
      ...styles,
      color: '#B3BACC',
      fontWeight: 'light',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#4B4261',
    }),
    noOptionsMessage: (styles) => ({
      ...styles,
      color: '#4B4261',
    }),
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
    if (searchTerm.length >= 3) {
      const results = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="mb-2 mt-4 flex justify-between">
        <FormInputLabel name="Produkt*" />
        <div className="text-purple-light text-xs mt-1.5 pl-0.5">
          Nenasli ste hladany produkt?{' '}
          <Link href={`mailto: ${SVETA_EMAIL}`}>
            <a className="hover:underline">Napiste mi :)</a>
          </Link>
        </div>
      </div>
      <Controller
        render={({ field, fieldState }) => (
          <Select<SelectProductFieldsFragment>
            {...field}
            {...fieldState}
            styles={customStyles}
            options={searchProducts}
            {...props}
            components={{ Option }}
            getOptionValue={(product: SelectProductFieldsFragment) =>
              product.id.toString()
            }
            getOptionLabel={(product: SelectProductFieldsFragment) =>
              product.name
            }
            onInputChange={(e) => {
              setSearchTerm(e);
            }}
            placeholder="Vyhladat produkt od 3 znakov"
            value={watchedProduct}
            noOptionsMessage={() => 'Ziadne dalsie vysledky'}
          />
        )}
        name="product"
        control={control}
        rules={{ required: true }}
        defaultValue={null}
      />
      <div className="flex justify-between my-6">
        <div className="w-full pr-3">
          <div className="mb-2">
            <FormInputLabel name="Macka*" />
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
                placeholder="Vyhladat/Vybrat macku"
                noOptionsMessage={() => 'Ziadne dalsie vysledky'}
              />
            )}
          />
        </div>
        <div className="w-full pl-3">
          <div className="mb-2">
            <FormInputLabel name="Hodnotenie*" />
          </div>
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
                placeholder={reviewType || 'Vybrat hodnotenie (1-5)'}
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
