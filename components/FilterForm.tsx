import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';
import Select from 'react-select';
import NeutralButton from './NeutralButton';
import {
  GetReviewsQuery,
  SelectCatFieldsFragment,
  SelectBrandTypeFieldsFragment,
  Review,
  Cat,
  ReviewType,
  BrandType,
} from '../graphql/generated/graphql';
import PaginationTable from './PaginationTable';
import { customStyles as style } from '../utils/formStyles';
import { useState } from 'react';
import { useEffect } from 'react';
import CenterContainer from './CenterContainer';
import LeftContainer from './LeftContainer';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
interface FilterFormProps {
  selectCats: GetReviewsQuery['selectCats'];
  selectBrands: GetReviewsQuery['selectBrands'];
  reviews: GetReviewsQuery['reviews'];
}

const FilterForm = ({ selectCats, selectBrands, reviews }: FilterFormProps) => {
  const { control, watch, setValue } = useForm();
  const { t } = useTranslation();

  const [reviewData, setReviewData] =
    useState<GetReviewsQuery['reviews']>(reviews);

  const watchedBrand: GetReviewsQuery['selectBrands'] = watch('brand');
  const watchedCat: GetReviewsQuery['selectCats'] = watch('cat');
  const watchedRating: RatingOption[] = watch('rating');

  useEffect(() => onFilter(), [watchedBrand, watchedCat, watchedRating]);

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

    if (watchedCat !== undefined) {
      if (
        watchedCat.length === 0 &&
        watchedRating.length === 0 &&
        watchedBrand.length === 0
      ) {
        setReviewData(reviews);
      } else {
        setReviewData(catFilterData);
      }
    }
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setReviewData(reviews);
    let fields = ['cat', 'brand', 'rating'];
    for (let field of fields) {
      setValue(field, []);
    }
  };

  interface RatingOption {
    value: number;
    label: string;
  }

  const ratingOptions = [
    { value: 1, label: t(sk['first']) },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: t(sk['fifth']) },
  ];

  const customStyles = style;

  return (
    <>
      <CenterContainer>
        <PaginationTable
          reviews={reviewData}
          numberOfProducts={reviewData.length}
          title={`${t(sk['all'])} ${
            reviewData === reviews ? t(sk['reviewed']) : t(sk['filtered'])
          } ${t(sk['products'])} ${reviewData.length}`}
        />
      </CenterContainer>
      <LeftContainer>
        <Title title={t(sk['filter'])} />
        <form className="w-full flex flex-col justify-between mb-5">
          <div className="mb-5">
            <Controller
              render={({ field, fieldState }) => (
                <Select<SelectBrandTypeFieldsFragment, true>
                  {...field}
                  {...fieldState}
                  isMulti
                  options={selectBrands}
                  styles={customStyles}
                  getOptionValue={(brand: SelectBrandTypeFieldsFragment) =>
                    brand.value.toString()
                  }
                  getOptionLabel={(brand: SelectBrandTypeFieldsFragment) =>
                    brand.comment
                  }
                  placeholder={t(sk['by_brand'])}
                  noOptionsMessage={() => t(sk['no_results'])}
                />
              )}
              name="brand"
              control={control}
              defaultValue={[]}
            />
          </div>
          <div className="mb-5">
            <Controller
              render={({ field, fieldState }) => (
                <Select<SelectCatFieldsFragment, true>
                  {...field}
                  isMulti
                  options={selectCats}
                  styles={customStyles}
                  getOptionValue={(cat: SelectCatFieldsFragment) =>
                    cat.id.toString()
                  }
                  getOptionLabel={(cat: SelectCatFieldsFragment) => cat.name}
                  placeholder={t(sk['by_cat'])}
                  noOptionsMessage={() => t(sk['no_results'])}
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
                  noOptionsMessage={() => t(sk['no_results'])}
                  placeholder={t(sk['by_rating'])}
                />
              )}
            />
          </div>
          {reviewData !== reviews ? (
            <SubmitButton
              text={t(sk['reset'])}
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
