import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Cat_Insert_Input,
  Cat_Set_Input,
  CatFieldsFragmentFragment,
  CatTypeEnum_Enum as catTypes,
  GetProductsQuery,
  Review_Insert_Input,
  ReviewHistory_Insert_Input,
  SelectProductFieldsFragment,
} from '../../graphql/generated/graphql';
import {
  Controller,
  useFieldArray,
  useForm,
  FieldValues,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import FormErrorMessage from '../FormErrorMessage';
import FormLegend from '../FormLegend';
import FormInputWrapper from '../FormInputWrapper';
import FormInputLabel from '../FormInputLabel';
import FormInput from '../FormInput';
import FormSelectBox from '../FormSelectBox';
import BackButton from '../Buttons/BackButton';
import SubmitButton from '../SubmitButton';
import { getUser } from '../../utils/user';
import cs from '../../public/locales/cs/common.json';
import UploadImage from '../UploadImage';
import {
  CAT_TYPE_NULL,
  DEFAULT_CAT_IMAGE as defaultImage,
} from '../../utils/constants';
import { useS3Upload } from 'next-s3-upload';
import RatingController from '../RatingController';
import useSearch from '../../hooks/useSearch';
import { uploadImage } from '../../utils/uploadImage';
import DateFormatObject from '../../utils/getFormatDate';
import ProductController from '../ProductController';

export type CatInputData = Omit<Cat_Insert_Input, 'CatTypeEnum'>;
interface CatFormInterface {
  handleSubmit1: {
    (
      cat: CatInputData | Cat_Set_Input,
      reviews?: [Review_Insert_Input] | [ReviewHistory_Insert_Input],
      updatedReviews?: {
        deleted: Array<CatFormProduct>;
        merged: Array<CatFormProduct>;
      }
    ): Promise<boolean>;
  };
  submitText: string;
  catData?: CatFieldsFragmentFragment;
  products?: GetProductsQuery['products'];
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
}: CatFormInterface): JSX.Element => {
  const catImage = useMemo<string>(
    () => (catData && catData.image_url ? catData.image_url : defaultImage),
    [catData]
  );
  const [imageUrl, setImageUrl] = useState<string>(catImage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchProducts, setSearchProducts] = useState<
    Array<SelectProductFieldsFragment>
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { FileInput, openFileDialog } = useS3Upload();
  const { t } = useTranslation();
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

  const [userDefaultValues, setUserDefaultValues] =
    useState<CatFormProduct[]>(review);

  interface CatSubmissionTypeForm extends FieldValues {
    name: CatFieldsFragmentFragment['name'];
    gender: CatFieldsFragmentFragment['gender'];
    age: CatFieldsFragmentFragment['age'];
    color: CatFieldsFragmentFragment['color'];
    weight: CatFieldsFragmentFragment['weight'];
    cat_image: CatFieldsFragmentFragment['image_url'];
    daily_food: CatFieldsFragmentFragment['daily_food'];
    doctor_email: CatFieldsFragmentFragment['doctor_email'];
    note: CatFieldsFragmentFragment['note'];
    type: CatFieldsFragmentFragment['type'];
    fieldArray: Array<CatFormProduct>;
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CatSubmissionTypeForm>({
    defaultValues: {
      name: catData && catData.name,
      gender: catData && catData.gender,
      age:
        catData &&
        catData.age &&
        DateFormatObject().getCatAge(catData.year_date),
      color: catData && catData.color,
      weight: catData && catData.weight,
      cat_image: catData && catData.image_url,
      daily_food: catData && catData.daily_food,
      doctor_email: catData && catData.doctor_email,
      note: catData && catData.note,
      type: catData && catData.type,
      fieldArray: [],
    },
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fieldArray',
    keyName: 'fieldArray',
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
    const changedValue = setValue('cat_image', defaultImage);
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

  const [isRemoved, setIsRemoved] = useState(false);

  const userProductsArrayMain = watchFieldArray;

  const deletedReviews =
    userProductsArrayMain && userProductsArrayMain
      ? review &&
        review.filter(
          (x) =>
            !userProductsArrayMain
              .map((item) => item?.product?.id)
              .includes(x?.product?.id)
        )
      : [];

  let limitedSearchProducts =
    review &&
    review.length > 0 &&
    getUniqueReviews().filter(
      (x) => !review.map((item) => item.product.name).includes(x && x.name)
    );
  limitedSearchProducts = [
    ...getUniqueReviews().filter(
      (x) =>
        !userProductsArrayMain
          .map((item) => item.product !== undefined && item.product.id)
          .includes(x.id)
    ),
    ...getUniqueReviews().filter(
      (x) => deletedReviews && deletedReviews.includes(x.name)
    ),
  ];

  useSearch(searchTerm, limitedSearchProducts, setSearchProducts);

  const diff =
    userProductsArrayMain &&
    userProductsArrayMain.filter(
      ({ rating: id1, product: p1 }) =>
        review &&
        !review.some(
          ({ rating: id2, product: p2 }) => id2 === id1 && p1?.id === p2?.id
        )
    );

  const mergedInsertUpdate = diff ? diff : [];

  useEffect(() => {
    if (review && review.length === userDefaultValues.length) {
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
  }, []);

  useEffect(() => {
    const userProductsArray =
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
          userProductsArray.map((item) => {
            return {
              product: {
                brand_type: item?.product?.brand_type,
                id: item?.product?.id,
                image_url: item?.product?.image_url,
                name: item?.product?.name,
                __typename: item?.product?.__typename,
              },
              rating: item?.rating,
            };
          })
      );

      setIsRemoved(false);
    }
  }, [isRemoved, userDefaultValues]);

  const handleFileChange = async (file: File) => {
    setIsLoading(true);
    if (checkFileType(file)) {
      const url = await uploadImage(file, catData?.slug);
      setImageUrl(url);
      setValue('cat_image', url);
      setIsLoading(false);
    } else {
      alert(t(cs['unsupported_file']));
    }
  };

  const fileTypes = ['png', 'jpg', 'gif', 'webp', 'jpeg', 'heic'];
  const checkFileType = (file: File) => {
    if (file && file.name) {
      const value = file.name;
      const fileType = value
        .substring(value.lastIndexOf('.') + 1, value.length)
        .toLowerCase();
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
            router.back();
          } else {
            router.back();
          }
        } else {
          alert(t(cs['add_cat_error_modal']));
          router.back();
        }
      });
    },
    [
      handleSubmit1,
      imageUrl,
      deletedReviews,
      diff,
      mergedInsertUpdate,
      watchedCatImage,
    ]
  );

  const catTypeOptions = useMemo(() => {
    const newEnum = [CAT_TYPE_NULL, ...Object.values(catTypes).sort()];
    return newEnum.map((item) => {
      return (
        <option value={item} key={item}>
          {t(cs[item] || cs[CAT_TYPE_NULL])}
        </option>
      );
    });
  }, [catTypes]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <fieldset>
        <FormLegend name={t(cs['basic_info'])} />
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
            }}
            render={() => (
              <FileInput
                onChange={handleFileChange}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/heic, image/PNG, image/JPEG, image/JPG, image/WEBP, image/GIF, image/HEIC"
              />
            )}
            {...(errors.cat_image &&
              errors.cat_image.type === 'checkFileType' && (
                <FormErrorMessage
                  error={`${t(cs['file_error'])} ${fileTypes}`}
                />
              ))}
          />
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-0 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={`${t(cs['cat_name'])}*`} />
            <FormInput
              registerRules={register('name', {
                required: { value: true, message: t(cs['cat_name_required']) },
                maxLength: {
                  value: 100,
                  message: t(cs['cat_name_length']),
                },
              })}
              type="text"
              name="name"
              placeholder={t(cs['cat_name_placeholder'])}
              errors={errors.name}
            />
            {errors.name && <FormErrorMessage error={errors.name?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(cs['gender'])} />
            <FormSelectBox
              {...register('gender', { required: false })}
              name="gender"
              control={control}
            >
              <option value="" key="">
                {t(cs['none'])}
              </option>
              <option value="cat" key="cat">
                {t(cs['cat'])}
              </option>
              <option value="tomcat" key="tomcat">
                {t(cs['tomcat'])}
              </option>
            </FormSelectBox>
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-0 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={t(cs['cat_age'])} />
            <FormInput
              registerRules={register('age', {
                min: 0,
                max: 30,
                required: false,
              })}
              type="number"
              name="age"
              step={1}
              errors={errors.age}
              placeholder={t(cs['cat_age_placeholder'])}
            />
            {errors.age && <FormErrorMessage error={t(cs['cat_age_error'])} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(cs['cat_color'])} />
            <FormInput
              registerRules={register('color', { required: false })}
              type="text"
              name="color"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-0 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={t(cs['cat_weight'])} />
            <FormInput
              registerRules={register('weight', { required: false })}
              type="number"
              min={0}
              placeholder="1,5 kg"
              step={0.1}
              name="weight"
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(cs['cat_daily_food'])} />
            <FormInput
              registerRules={register('daily_food', { required: false })}
              type="number"
              step={0.1}
              min={0}
              placeholder={t(cs['cat_daily_food_placeholder'])}
              name="daily_food"
            />
          </FormInputWrapper>
        </div>
        <div className="grid grid-cols-1 xl-custom:grid-cols-2 gap-0 xl-custom:gap-10">
          <FormInputWrapper>
            <FormInputLabel name={t(cs['doctor_email'])} />
            <FormInput
              registerRules={register('doctor_email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t(cs['email_bad_format']),
                },
              })}
              type="email"
              name="doctor_email"
              placeholder={t(cs['email_placeholder'])}
            />
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={t(cs['cat_type'])} />
            <FormSelectBox
              {...register('type', { required: false })}
              name="type"
              control={control}
            >
              {catTypeOptions}
            </FormSelectBox>
          </FormInputWrapper>
        </div>
      </fieldset>
      <fieldset>
        <FormLegend name={t(cs['cat_foods'])} />
        {controlledFields.map((field, index) => (
          <div
            key={field.fieldArray}
            className="flex flex-col xl-custom:flex-row justify-between xl-custom:items-center mb-3"
          >
            <div className="w-full xl-custom:w-1/2 mb-1 xl-custom:mb-0 xl-custom:pr-3">
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
              />
            </div>
            <div className="pl-0 w-full xl-custom:w-2/6 xxl-custom:w-2/5 mb-2 xl-custom:mb-5">
              <RatingController
                name={`fieldArray.${index}.rating`}
                control={control}
                defaultValue={field.rating}
                isDisabled={false}
                errors={errors}
                placeholder={t(cs['choose_review_1'])}
                {...register(`fieldArray.${index}.rating` as const, {
                  required: true,
                })}
              />
            </div>
            <button
              type="button"
              className="mt-2 xl-custom:mt-5 text-left xl-custom:mt-5 text-red-500"
              onClick={() => {
                remove(index);
                setIsRemoved(true);
              }}
            >
              {t(cs['remove'])}
            </button>
          </div>
        ))}
        <div className="text-red-500 mb-4 -mt-2">
          {errors.fieldArray && t(cs['reviews_error'])}
        </div>

        <button
          type="button"
          className=" text-purple mb-3 font-semibold"
          onClick={() => append({})}
        >
          {t(cs['add_review_small'])}
        </button>
      </fieldset>
      <fieldset>
        <div className="flex flex-col w-full mt-2">
          <FormInputLabel name={t(cs['cat_note'])} />
          <textarea
            maxLength={500}
            {...register('note', {
              required: false,
              maxLength: {
                value: 500,
                message: t(cs['cat_note_error']),
              },
            })}
            placeholder={t(cs['cat_note_placeholder'])}
            className="form-textarea w-full mb-3 mt-2 text-purple block border-rounded-base border-gray
              focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray h-200 xl-custom:h-32"
          />
          <span className="text-sm font-light text-gray">
            {watchedNote !== undefined &&
            watchedNote &&
            watchedNote.length <= 500
              ? `${t(cs['remain'])} ${500 - watchedNote?.length} ${t(
                  cs['500_chars']
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
