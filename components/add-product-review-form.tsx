import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './submit-button';
import { useMutation } from '@apollo/client';
import {
  AddReviewHistoryMutation,
  AddReviewHistoryMutationVariables,
  AddReviewMutation,
  AddReviewMutationVariables,
  CatDetailFieldsFragmentFragment,
  GetDashboardQuery,
  ReviewHistory_Insert_Input,
  Review_Insert_Input,
  SelectCatFieldsFragment,
  SelectProductFieldsFragment,
} from '../graphql/generated/graphql';
import Select, { components } from 'react-select';
import NeutralButton from './neutral-button';
import { ADD_REVIEW, ADD_REVIEW_HISTORY } from '../graphql/mutations';
import {
  CATS_DETAIL_QUERY,
  CATS_QUERY,
  DASHBOARD_QUERY,
} from '../graphql/queries';
import FormInputLabel from './form-input-label';
import { SVETA_EMAIL } from '../utils/constants';
import Link from 'next/link';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import { getUser } from '../utils/user';
import { TIP_LIMIT } from '../utils/constants';
import { customStyles as style } from '../utils/form-styles';
interface AddProductReviewFormProps {
  selectCats: GetDashboardQuery['selectCats'];

  selectProducts: GetDashboardQuery['selectProducts'];
  onBackAction: () => void;
  onSuccess?: () => void;
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

  const [createReview] =
    useMutation<AddReviewMutation, AddReviewMutationVariables>(ADD_REVIEW);

  const [createReviewHistory] =
    useMutation<AddReviewHistoryMutation, AddReviewHistoryMutationVariables>(
      ADD_REVIEW_HISTORY
    );

  const onSubmit = (data: any) => {
    const reviewInput: Review_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: data.rating.value.toString(),
    };

    const reviewHistoryInput: ReviewHistory_Insert_Input = {
      cat_id: Number(data.cat.id),
      product_id: Number(data.product.id),
      review_type: data.rating.value.toString(),
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

  const customStyles = style;

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

  console.log(reviewType);
  const handleReviewCombination = (
    cat: SelectCatFieldsFragment,
    product: SelectProductFieldsFragment
  ) => {
    if (cat && product) {
      console.log(cat);
      console.log(product);
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
          Nenašli ste hľadaný produkt?{' '}
          <Link href={`mailto: ${SVETA_EMAIL}`}>
            <a className="hover:underline">Napíšte mi :)</a>
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
            placeholder="Vyhľadať produkt od 3 znakov"
            value={watchedProduct}
            noOptionsMessage={() => 'Žiadne ďalšie výsledky'}
          />
        )}
        name="product"
        control={control}
        rules={{ required: true }}
        defaultValue={null}
      />
      <div className="flex justify-between my-6 mb-10">
        <div className="w-full pr-3">
          <div className="mb-2">
            <FormInputLabel name="Mačka*" />
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
                placeholder="Vyhľadať/Vybrať mačku"
                noOptionsMessage={() => 'Žiadne ďaľsie výsledky'}
                isDisabled={selectCats.length === 1 ? true : false}
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
                noOptionsMessage={() => 'Žiadne ďaľšie výsledky'}
                isDisabled={reviewType !== '' ? true : false}
                placeholder={reviewType || 'Vybrať hodnotenie (1-5)'}
              />
            )}
          />
        </div>
      </div>

      {reviewType !== '' ? (
        <span className="flex text-red-500">
          Pre mačku {watchedCat.name} a krmivo {watchedProduct.name} už máte
          vybrané hodnotenie {reviewType}
        </span>
      ) : null}

      <NeutralButton title="Späť" onClick={onBackAction} />
      <SubmitButton text="Uložiť" disabled={reviewType !== ''} size="w-1/4" />
    </form>
  );
};

export default AddProductReviewForm;
