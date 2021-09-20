import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';
import Select from 'react-select';
import {
  GetReviewsQuery,
  SelectCatFieldsFragment,
  SelectBrandTypeFieldsFragment,
  BrandType,
  ProductType,
  SelectProductTypeFieldsFragment,
} from '../graphql/generated/graphql';
import PaginationTable from './PaginationTable';
import { customStyles as style } from '../utils/formStyles';
import { useState } from 'react';
import { useEffect } from 'react';
import CenterContainer from './Containers/CenterContainer';
import LeftContainer from './LeftContainer';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import RangeInput from './RangeInput';

interface FilterFormProps {
  selectCats: GetReviewsQuery['selectCats'];
  selectBrands: GetReviewsQuery['selectBrands'];
  reviews: GetReviewsQuery['reviews'];
  selectProductTypes: GetReviewsQuery['selectProductTypes'];
}

interface RatingOption {
  value: number;
  label: string;
}

const FilterForm = ({
  selectCats,
  selectBrands,
  reviews,
  selectProductTypes,
}: FilterFormProps): JSX.Element => {
  const [reviewData, setReviewData] =
    useState<GetReviewsQuery['reviews']>(reviews);
  const rangeDefault = [0, 100];
  const customStyles = style;
  const { control, watch, setValue } = useForm();
  const { t } = useTranslation();
  const watchedBrand: GetReviewsQuery['selectBrands'] = watch('brand');
  const watchedCat: GetReviewsQuery['selectCats'] = watch('cat');
  const watchedRating: RatingOption[] = watch('rating');
  const watchedEshopRating: RatingOption[] = watch('eshopRating');
  const watchedType: GetReviewsQuery['selectProductTypes'] = watch('type');
  const [watchedProtein, setWatchedProtein] = useState(rangeDefault);
  const [watchedFat, setWatchedFat] = useState(rangeDefault);

  const ratingOptions = [
    { value: 1, label: t(cs['first']) },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: t(cs['fifth']) },
  ];

  useEffect(
    () => onFilter(),
    [
      watchedBrand,
      watchedCat,
      watchedRating,
      watchedType,
      watchedEshopRating,
      watchedProtein,
      watchedFat,
    ]
  );

  const onFilter = () => {
    let catFilterData = reviews;
    if (watchedCat && watchedCat.length > 0) {
      catFilterData = reviews.filter((review) =>
        Object.values(watchedCat)
          .map((cat) => cat.id)
          .includes(review.cat.id)
      );
    }

    if (watchedRating && watchedRating.length > 0) {
      catFilterData = catFilterData.filter((review) =>
        Object.values(watchedRating)
          .map((rating) => String(rating.value))
          .includes(review.review_type)
      );
    }

    if (watchedBrand && watchedBrand.length > 0) {
      catFilterData = catFilterData.filter((review) =>
        Object.values(watchedBrand)
          .map((brand: BrandType) => brand.comment)
          .includes(review.product.brand_type)
      );
    }

    if (watchedEshopRating && watchedEshopRating.length > 0) {
      catFilterData = catFilterData.filter((review) => {
        const rating = review.product.rating;
        return (
          rating &&
          watchedEshopRating.map((rating) => rating.value).includes(rating)
        );
      });
    }

    if (watchedType && watchedType.length > 0) {
      catFilterData = catFilterData.filter((review) =>
        Object.values(watchedType)
          .map((type: ProductType) => type.value)
          .includes(review.product.product_type)
      );
    }

    if (rangeFilterActive(watchedProtein)) {
      catFilterData = catFilterData.filter((review) => {
        const protein = review.product.analysis_variant['bílkovina'];
        return (
          protein &&
          watchedProtein[0] <= protein &&
          watchedProtein[1] >= protein
        );
      });
    }

    if (rangeFilterActive(watchedFat)) {
      catFilterData = catFilterData.filter((review) => {
        const fat = review.product.analysis_variant['tuk'];
        return fat && watchedFat[0] <= fat && watchedFat[1] >= fat;
      });
    }

    if (watchedCat !== undefined) {
      setReviewData(catFilterData);
    }
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setReviewData(reviews);
    const fields = ['cat', 'brand', 'rating', 'type', 'eshopRating'];
    for (const field of fields) {
      setValue(field, []);
    }
    resetRangeFilters();
  };

  const resetRangeFilters = () => {
    ['protein', 'fat'].forEach((field) => setValue(field, rangeDefault));
    setWatchedProtein(rangeDefault);
    setWatchedFat(rangeDefault);
  };

  const rangeFilterActive = (value?: number[]) =>
    value && value.length === 2 && (value[0] !== 0 || value[1] !== 100);

  return (
    <>
      <CenterContainer>
        <PaginationTable
          reviews={reviewData}
          numberOfProducts={reviewData.length}
          title={`${t(cs['all'])} ${
            reviewData === reviews ? t(cs['reviewed']) : t(cs['filtered'])
          } ${t(cs['products'])}: ${reviewData.length}`}
        />
      </CenterContainer>
      <LeftContainer>
        <Title title={t(cs['filter'])} />
        <form className="w-full flex flex-col justify-between mb-5">
          <div className="mb-5">
            <Controller
              render={({ field, fieldState }) => (
                <Select<SelectBrandTypeFieldsFragment, true>
                  {...field}
                  styles={customStyles}
                  {...fieldState}
                  isMulti
                  options={selectBrands}
                  getOptionValue={(brand: SelectBrandTypeFieldsFragment) =>
                    brand.value.toString()
                  }
                  getOptionLabel={(brand: SelectBrandTypeFieldsFragment) =>
                    brand.comment
                  }
                  placeholder={t(cs['by_brand'])}
                  noOptionsMessage={() => t(cs['no_results'])}
                />
              )}
              name="brand"
              control={control}
              defaultValue={[]}
            />
          </div>
          <div className="mb-5">
            <Controller
              render={({ field }) => (
                <Select<SelectCatFieldsFragment, true>
                  {...field}
                  options={selectCats}
                  styles={customStyles}
                  getOptionValue={(cat: SelectCatFieldsFragment) =>
                    cat.id.toString()
                  }
                  getOptionLabel={(cat: SelectCatFieldsFragment) => cat.name}
                  placeholder={t(cs['by_cat'])}
                  noOptionsMessage={() => t(cs['no_results'])}
                  isMulti
                />
              )}
              name="cat"
              control={control}
              defaultValue={[]}
            />
          </div>
          <div className="mb-5">
            <Controller
              name="rating"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select<RatingOption, true>
                  {...field}
                  isMulti
                  styles={customStyles}
                  options={ratingOptions}
                  noOptionsMessage={() => t(cs['no_results'])}
                  placeholder={t(cs['by_rating'])}
                />
              )}
            />
          </div>
          <div className="mb-5">
            <Controller
              render={({ field }) => (
                <Select<SelectProductTypeFieldsFragment, true>
                  {...field}
                  isMulti
                  options={selectProductTypes}
                  styles={customStyles}
                  getOptionValue={(type) => type.value}
                  getOptionLabel={(type) => type.comment}
                  placeholder={t(cs['by_feed_type'])}
                  noOptionsMessage={() => t(cs['no_results'])}
                />
              )}
              name="type"
              control={control}
              defaultValue={[]}
            />
          </div>
          <div className="mb-5">
            <Controller
              name="eshopRating"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select<RatingOption, true>
                  {...field}
                  isMulti
                  styles={customStyles}
                  options={ratingOptions}
                  noOptionsMessage={() => t(cs['no_results'])}
                  placeholder={t(cs['by_eshop_reviews'])}
                />
              )}
            />
          </div>
          <div className="mb-5 mx-3">
            <Controller
              render={({ field }) => (
                <RangeInput
                  {...field}
                  onFinalChange={(value) => {
                    setWatchedProtein(value);
                  }}
                  value={field.value}
                  min={0}
                  max={100}
                  step={1}
                  label={t(cs['by_protein'])}
                />
              )}
              name="protein"
              control={control}
              defaultValue={rangeDefault}
            />
          </div>
          <div className="mb-5 mx-3">
            <Controller
              render={({ field }) => (
                <RangeInput
                  {...field}
                  onFinalChange={(value) => {
                    setWatchedFat(value);
                  }}
                  value={field.value}
                  min={0}
                  max={100}
                  step={1}
                  label={t(cs['by_fat'])}
                />
              )}
              name="fat"
              control={control}
              defaultValue={rangeDefault}
            />
          </div>
          {reviewData !== reviews ? (
            <SubmitButton
              text={t(cs['reset'])}
              size="w-full"
              color="bg-red-500"
              onClick={resetFilter}
              hover="hover:bg-red-800"
            />
          ) : null}
        </form>
      </LeftContainer>
    </>
  );
};

export default FilterForm;
