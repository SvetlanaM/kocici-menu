import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Cat_Insert_Input,
  Cat_Set_Input,
  CatFieldsFragmentFragment,
  CatTypeEnum_Enum as catTypes,
  GetProductsQuery,
  Product,
  Review_Insert_Input,
  ReviewHistory_Insert_Input,
  SelectProductFieldsFragment,
} from '../graphql/generated/graphql';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import FormErrorMessage from './FormErrorMessage';
import FormLegend from './FormLegend';
import FormInputWrapper from './FormInputWrapper';
import FormInputLabel from './FormInputLabel';
import FormInput from './FormInput';
import FormSelectBox from './FormSelectBox';
import BackButton from './BackButton';
import SubmitButton from './SubmitButton';
import { getUser } from '../utils/user';
import sk from '../public/locales/sk/common.json';
import UploadImage from './UploadImage';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import { useS3Upload } from 'next-s3-upload';
import Loading from './Loading';
import ProductController from './ProductController';
import RatingController from './RatingController';
import useSearch from '../hooks/useSearch';
import { uploadImage } from '../utils/uploadImage';
import ErrorScreen from './ErrorScreen';

export type CatInputData = Omit<Cat_Insert_Input, 'CatTypeEnum'>;
export const CAT_TYPE_NULL = 'CAT_TYPE_NULL';

interface CatFormInterface {
  handleSubmit1: {
    (
      cat: CatInputData | Cat_Set_Input,
      reviews?: [Review_Insert_Input] | [ReviewHistory_Insert_Input],
      updatedReviews?: {
        deleted: Array<CatFormProduct>;
        merged: Array<SelectProductFieldsFragment>;
      }
    ): Promise<boolean>;
  };
  submitText: string;
  catData?: CatFieldsFragmentFragment;
  products?: GetProductsQuery['products'];
  loading?: boolean;
}

type CatFormProduct = {
  product: SelectProductFieldsFragment;
  rating: number;
};

const CatForm = ({
  handleSubmit1,
  submitText,
  catData,
  products,
  loading,
}: CatFormInterface) => {
  const catImage = useMemo<string>(
    () => (catData && catData.image_url ? catData.image_url : defaultImage),
    [catData]
  );
  const [imageUrl, setImageUrl] = useState<string>(catImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMainLoading, setIsMainLoading] = useState<boolean>(false);
  const { FileInput, openFileDialog } = useS3Upload();
  const { t } = useTranslation();
  const [searchProducts, setSearchProducts] = useState<
    Array<SelectProductFieldsFragment>
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [updateData, setUpdateData] = useState<boolean>(false);

  const router = useRouter();
  const reviewFactory = (
    product: {
      name: string;
      id: number;
      brand_type?: string;
      image_url?: string;
      __typename?: 'Product';
    },
    rating: number
  ) => {
    return {
      product,
      rating,
    };
  };

  const review: Array<CatFormProduct> =
    catData &&
    catData.reviews
      .map((item) => {
        const sorted = item.products.reviewhistory;
        return reviewFactory(
          {
            name: item.products.name,
            id: item.products.id,
            brand_type: item.products.brand_type,
            image_url: item.products.image_url,
            __typename: item.products.__typename,
          },
          Number(sorted.map((item) => item.review_type)[0])
        );
      })
      .sort((a, b) => b.rating - a.rating);

  const [userDefaultValues, setUserDefaultValues] = useState(review);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: catData && catData.name,
      gender: catData && catData.gender,
      age: catData && catData.age,
      color: catData && catData.color,
      weight: catData && catData.weight,
      cat_image: catData && catData.image_url,
      daily_food: catData && catData.daily_food,
      doctor_email: catData && catData.doctor_email,
      note: catData && catData.note,
      type: catData && catData.type,
    },
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fieldArray',
  });

  const watchFieldArray = watch('fieldArray');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const noteInputName = 'note';
  const watchedNote: string | undefined = watch(noteInputName);
  const watchedCatImage: string | undefined = watch('cat_image');

  const resetPhoto = useCallback(() => {
    setIsLoading(true);
    setImageUrl(defaultImage);
    let changedValue = setValue('cat_image', defaultImage);
    changedValue !== null && setIsLoading(false);
    setImageUrl(defaultImage);
    return changedValue;
  }, []);

  const getUniqueReviews = () => {
    return Array.from(new Set(products.map((item) => item.name))).map(
      (name) => {
        return products.find((item) => item.name === name);
      }
    );
  };
  const [limitedSearchProducts, setLimitedSearchedProducts] = useState<
    Array<SelectProductFieldsFragment>
  >(getUniqueReviews());

  useSearch(searchTerm, limitedSearchProducts, setSearchProducts);

  const userProductsArrayMain =
    watchFieldArray && watchFieldArray.map((item) => item);

  const deletedReviews = useMemo(() => {
    return userProductsArrayMain && userProductsArrayMain
      ? userProductsArrayMain.length > 1
        ? review &&
          review.filter(
            (x) =>
              !userProductsArrayMain
                .map((item) => item.product !== undefined && item.product.id)
                .includes(x.product !== undefined && x.product.id)
          )
        : review
      : [];
  }, [userDefaultValues]);

  console.log('deletedReviews', deletedReviews);

  useEffect(() => {
    let userProductsArray =
      watchFieldArray &&
      watchFieldArray.map(
        (item) => item.product !== undefined && item.product.id
      );

    let deleted =
      deletedReviews && deletedReviews.map((item) => item.product.name);

    if (
      userProductsArray &&
      userProductsArray.length > 0 &&
      searchTerm !== ' '
    ) {
      setLimitedSearchedProducts([
        ...getUniqueReviews().filter((x) => !userProductsArray.includes(x.id)),
        ...getUniqueReviews().filter((x) => deleted.includes(x.name)),
      ]);
    }
  }, [searchTerm, deletedReviews]);

  const newReviews = useMemo(() => {
    return userProductsArrayMain
      ? userProductsArrayMain &&
          review &&
          userProductsArrayMain.filter(
            (x) =>
              !review
                .map(
                  (item) =>
                    item !== undefined &&
                    x.product !== undefined &&
                    item.product.id
                )
                .includes(x.product !== undefined && x.product.id)
          )
      : [];
  }, [userProductsArrayMain, deletedReviews]);

  const diff =
    userProductsArrayMain &&
    userProductsArrayMain.filter(
      ({ rating: id1, product: p1 }) =>
        review &&
        !review.some(
          ({ rating: id2, product: p2 }) => id2 === id1 && p1.id === p2.id
        )
    );

  let mergedInsertUpdate = diff ? diff : [];

  console.log(mergedInsertUpdate);

  useEffect(() => {
    setUpdateData(true), setUserDefaultValues(review);
  }, [catData]);

  useMemo(() => {
    if (review && review.length > 0) {
      setLimitedSearchedProducts((prevState) =>
        prevState.filter(
          (x) => !review.map((item) => item.product.name).includes(x && x.name)
        )
      );

      if (review.length === userDefaultValues.length) {
        setValue(
          'fieldArray',
          userDefaultValues &&
            userDefaultValues.map((item) => {
              return {
                product: {
                  brand_type: item.product.brand_type,
                  id: item.product.id,
                  image_url: item.product.image_url,
                  name: item.product.name,
                  __typename: item.product.__typename,
                },
                rating: item.rating,
              };
            })
        );
      }
    }
  }, [updateData]);

  const [isRemoved, setIsRemoved] = useState(false);
  useEffect(() => {
    let userProductsArray =
      watchFieldArray &&
      watchFieldArray.map((item) => item.product !== undefined && item);

    if (
      userProductsArray &&
      userProductsArray.length > 0 &&
      watchFieldArray &&
      isRemoved
    ) {
      setUserDefaultValues(userProductsArray);

      setValue(
        'fieldArray',
        userProductsArray &&
          userProductsArray
            .map((item) => {
              return {
                product: {
                  brand_type:
                    item.product !== undefined && item.product.brand_type,
                  id: item.product !== undefined && item.product.id,
                  image_url:
                    item.product !== undefined && item.product.image_url,
                  name: item.product !== undefined && item.product.name,
                  __typename:
                    item.product !== undefined && item.product.__typename,
                },
                rating: item.rating !== undefined && item.rating,
              };
            })
            .filter((item) => item.product.id !== false)
      );

      setIsRemoved(false);
    }
  }, [isRemoved, userDefaultValues]);

  const handleFileChange = async (file: File) => {
    setIsLoading(true);
    if (checkFileType(file)) {
      let url = await uploadImage(file, catData.slug);
      setImageUrl(url);
      setValue('cat_image', url);
      setIsLoading(false);
    } else {
      alert(t(sk['unsupported_file']));
    }
  };

  const fileTypes = ['png', 'jpg', 'gif', 'webp', 'jpeg'];
  const checkFileType = (file: File) => {
    if (file && file.name) {
      let value = file.name;
      let fileType = value.substring(value.lastIndexOf('.') + 1, value.length);
      return fileTypes.indexOf(fileType) > -1;
    }
  };

  const onSubmit = useCallback(
    (data) => {
      const catInput: CatInputData | Cat_Set_Input = {
        age: data.age ? Number(data.age) : null,
        name: data.name,
        user_id: getUser(),
        doctor_email: data.doctor_email,
        gender: data.gender,
        weight: data.weight ? Number(data.weight) : null,
        type: data.type !== CAT_TYPE_NULL ? data.type : null,
        note: data.note,
        color: data.color,
        daily_food: data.daily_food ? Number(data.daily_food) : null,
        id: catData ? catData.id : null,
        image_url: watchedCatImage,
      };
      const reviewsInput = data.fieldArray;

      handleSubmit1(catInput, reviewsInput, {
        merged: mergedInsertUpdate,
        deleted: deletedReviews,
      }).then((success: boolean) => {
        if (success) {
          if (catData) {
            // setIsMainLoading(false);
            router.back();
          } else {
            router.back();
          }
        } else {
          alert(t(sk['add_cat_error_modal']));
        }
      });
    },
    [
      handleSubmit1,
      imageUrl,
      deletedReviews,
      diff,
      mergedInsertUpdate,
      isMainLoading,
      watchedCatImage,
    ]
  );

  const catTypeOptions = useMemo(() => {
    let newEnum = [CAT_TYPE_NULL, ...Object.values(catTypes).sort()];
    return newEnum.map((item) => {
      return (
        <option value={item} key={item}>
          {t(sk[item] || sk[CAT_TYPE_NULL])}
        </option>
      );
    });
  }, [catTypes]);

  return isMainLoading ? (
    <Loading />
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // setIsMainLoading(false);
        handleSubmit(onSubmit)();
      }}
      className="w-full"
    >
      <fieldset>
        <FormLegend name={t(sk['basic_info'])} />
        <div>
          <UploadImage
            imageUrl={watchedCatImage ? watchedCatImage : catImage}
            openFileDialog={openFileDialog}
            isLoading={isLoading}
            resetPhoto={resetPhoto}
          />
          <Controller
            name="cat_image"
            control={control}
            rules={{
              required: false,
              validate: {
                checkFileType: checkFileType,
              },
            }}
            render={() => (
              <FileInput
                onChange={handleFileChange}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
              />
            )}
            {...(errors.cat_image &&
              errors.cat_image.type === 'checkFileType' && (
                <FormErrorMessage
                  error={`${t(sk['file_error'])} ${fileTypes}`}
                />
              ))}
          />
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-3 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={t(sk['cat_name'])} />
            <FormInput
              {...register('name', {
                required: { value: true, message: t(sk['cat_name_required']) },
                maxLength: {
                  value: 100,
                  message: t(sk['cat_name_length']),
                },
              })}
              type="text"
              name="name"
              placeholder={t(sk['cat_name_placeholder'])}
              errors={errors.name}
            />
            {errors.name && <FormErrorMessage error={errors.name?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(sk['gender'])} />
            <FormSelectBox
              registerRules={{ ...register('gender', { required: false }) }}
            >
              <option value="" key="">
                {t(sk['none'])}
              </option>
              <option value="Macka" key="cat">
                {t(sk['cat'])}
              </option>
              <option value="Kocur" key="tomcat">
                {t(sk['tomcat'])}
              </option>
            </FormSelectBox>
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-3 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={t(sk['cat_age'])} />
            <FormInput
              {...register('age', { min: 0, max: 30, required: false })}
              type="number"
              name="age"
              step={1}
              errors={errors.age}
              placeholder={t(sk['cat_age_placeholder'])}
            />
            {errors.age && <FormErrorMessage error={t(sk['cat_age_error'])} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(sk['cat_color'])} />
            <FormInput
              {...register('color', { required: false })}
              type="text"
              name="color"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-3 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={t(sk['cat_weight'])} />
            <FormInput
              {...register('weight', { required: false })}
              type="number"
              placeholder="1,5 kg"
              step={0.1}
              name="weight"
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(sk['cat_daily_food'])} />
            <FormInput
              {...register('daily_food', { required: false })}
              type="number"
              placeholder={t(sk['cat_daily_food_placeholder'])}
              name="daily_food"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-3 xl-custom:gap-10 mt-3">
          <FormInputWrapper>
            <FormInputLabel name={t(sk['doctor_email'])} />
            <FormInput
              {...register('doctor_email', { required: false })}
              type="email"
              name="doctor_email"
              placeholder={t(sk['email_placeholder'])}
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(sk['cat_type'])} />
            <FormSelectBox
              registerRules={{ ...register('type', { required: false }) }}
            >
              {catTypeOptions}
            </FormSelectBox>
          </FormInputWrapper>
        </div>
      </fieldset>
      {/* <fieldset>
          <FormLegend name="Specialne poziadavky" />
        </fieldset> */}
      <fieldset>
        <FormLegend name={t(sk['cat_foods'])} />
        {controlledFields.map((field, index) => {
          return (
            <div
              key={field.id}
              className="flex flex-col xl-custom:flex-row justify-between xl-custom:items-center mb-3"
            >
              <div className="w-full xl-custom:w-1/2 mb-5 xl-custom:mb-0 xl-custom:pr-3">
                <ProductController
                  searchProducts={searchProducts}
                  onInputChange={(e) => {
                    setSearchTerm(e);
                  }}
                  name={`fieldArray.${index}.product`}
                  {...register(`fieldArray.${index}.product` as const)}
                  defaultValue={field.product}
                  control={control}
                  errors={errors}
                  showHint={false}
                  // isDisabled={
                  //   userDefaultValues &&
                  //   index < userDefaultValues.length &&
                  //   userDefaultValues.filter((item) => item !== false)
                  //     ? true
                  //     : false
                  // }
                />
              </div>
              <div className="pl-0 w-full xl-custom:w-2/6 mb-5">
                <RatingController
                  name={`fieldArray.${index}.rating`}
                  control={control}
                  defaultValue={field.rating}
                  isDisabled={false}
                  errors={errors}
                  placeholder={t(sk['choose_review_1'])}
                  {...register(`fieldArray.${index}.rating` as const)}
                />
              </div>
              <button
                type="button"
                className="mt-5 text-left xl-custom:mt-5 text-red-500"
                onClick={() => {
                  remove(index);
                  setIsRemoved(true);
                }}
              >
                {t(sk['remove'])}
              </button>
            </div>
          );
        })}
        <div className="text-red-500 mb-4 -mt-2">
          {errors.fieldArray && newReviews && t(sk['reviews_error'])}
        </div>

        <button
          type="button"
          className=" text-purple mb-3 font-semibold"
          onClick={() => append({})}
        >
          {t(sk['add_review_small'])}
        </button>
      </fieldset>
      <fieldset>
        <div className="flex flex-col w-full mt-2">
          <FormInputLabel name={t(sk['cat_note'])} />
          <textarea
            maxLength={500}
            {...register('note', {
              required: false,
              maxLength: {
                value: 500,
                message: t(sk['cat_note_error']),
              },
            })}
            placeholder={t(sk['cat_note_placeholder'])}
            className="form-textarea w-full mb-3 mt-2 text-purple block border-rounded-base border-gray
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray"
          />
          <span className="text-sm font-light text-gray">
            {watchedNote !== undefined &&
            watchedNote &&
            watchedNote.length <= 500
              ? `${t(sk['remain'])} ${500 - watchedNote?.length} ${t(
                  sk['500_chars']
                )}`
              : null}
          </span>
          {errors.note && <FormErrorMessage error={errors.note} />}
        </div>
      </fieldset>
      <div className="mt-8">
        <BackButton />
        <SubmitButton
          text={submitText}
          disabled={false}
          size="w-full xl-custom:w-1/4"
        />
      </div>
    </form>
  );
};

export default CatForm;
