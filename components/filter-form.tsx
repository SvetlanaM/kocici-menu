import { Controller, useForm } from 'react-hook-form';
import SubmitButton from './submit-button';
import Select from 'react-select';
import NeutralButton from './neutral-button';
import {
  GetReviewsQuery,
  SelectCatFieldsFragment,
  SelectBrandTypeFieldsFragment,
  Review,
  Cat,
  ReviewType,
  BrandType,
} from '../graphql/generated/graphql';
import PaginationTable from '../components/pagination-table';
import { customStyles as style } from '../utils/form-styles';
import { useState } from 'react';
import { useEffect } from 'react';

interface FilterFormProps {
  selectCats: GetReviewsQuery['selectCats'];
  selectBrands: GetReviewsQuery['selectBrands'];
  reviews: GetReviewsQuery['reviews'];
}

const FilterForm = ({ selectCats, selectBrands, reviews }: FilterFormProps) => {
  const { control, watch, setValue } = useForm();

  const [reviewData, setReviewData] =
    useState<GetReviewsQuery['reviews']>(reviews);

  const watchedBrand: GetReviewsQuery['selectBrands'] = watch('brand');
  const watchedCat: GetReviewsQuery['selectCats'] = watch('cat');
  const watchedRating: GetReviewsQuery['reviews'] = watch('rating');

  useEffect(() => onFilter(), [watchedBrand, watchedCat, watchedRating]);

  const onFilter = () => {
    const catFilterData = reviews.filter((review) =>
      watchedCat && watchedCat.length > 0
        ? Object.values(watchedCat)
            .map((cat) => cat.id)
            .includes(review.cat.id)
        : watchedCat
    );

    const reviewFilterData = reviews.filter((review) =>
      watchedRating && watchedRating.length > 0
        ? Object.values(watchedRating)
            .map((rating) => String(rating.value))
            .includes(review.review_type)
        : watchedRating
    );
    const brandFilterData = reviews.filter((review) =>
      watchedBrand && watchedBrand.length > 0
        ? Object.values(watchedBrand)
            .map((brand: BrandType) => brand.comment)
            .includes(review.product.brand_type)
        : watchedBrand
    );

    const filteredArray = catFilterData
      .filter((value) => reviewFilterData.includes(value))
      .filter((value) => brandFilterData.includes(value));

    if (watchedCat !== undefined) {
      if (
        watchedCat.length === 0 &&
        watchedRating.length === 0 &&
        watchedBrand.length === 0
      ) {
        setReviewData(reviews);
      } else {
        setReviewData(filteredArray);
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
    { value: 1, label: '1 (Najhoršie)' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5 (Najlepšie)' },
  ];

  const customStyles = style;

  return (
    <>
      <form className="w-full flex flex-row justify-between mb-5">
        <div className="w-1/3 mr-5">
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
                placeholder="Podľa značky"
                noOptionsMessage={() => 'Žiadne ďalšie výsledky'}
              />
            )}
            name="brand"
            control={control}
            defaultValue={[]}
          />
        </div>
        <div className="w-1/3 mr-5">
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
                placeholder="Podľa mačky"
                noOptionsMessage={() => 'Žiadne ďalšie výsledky'}
              />
            )}
            name="cat"
            control={control}
            defaultValue={[]}
          />
        </div>
        <div className="w-1/3 mr-5">
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
                noOptionsMessage={() => 'Žiadne ďaľšie výsledky'}
                placeholder={'Podľa hodnotenia'}
              />
            )}
          />
        </div>
        <SubmitButton
          text="Resetovať"
          size="w-1/4"
          color="bg-red-500"
          onClick={resetFilter}
          hover="hover:bg-red-800"
        />
      </form>

      <PaginationTable
        reviews={reviewData}
        numberOfProducts={reviewData.length}
        title={`Všetky ${
          reviewData === reviews ? 'hodnotené' : 'filtrované'
        } produkty: ${reviewData.length}`}
      />
    </>
  );
};

export default FilterForm;
