import { forwardRef, useCallback, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import Select, { components } from 'react-select';
import { customStyles as style } from '../utils/formStyles';
import ErrorScreen from './ErrorScreen';
import FormInputLabel from './FormInputLabel';
import RatingIcon from './RatingIcon';
const customStyles = style;
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface RatingControllerProps {
  props?: Array<string>;
  name: string;
  control?: Control<FieldValues>;
  isDisabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  errors?: any;
}
interface RatingOption {
  value: number;
  label: string;
}

const ratingOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

const RatingController = forwardRef(
  (
    { name, control, defaultValue, isDisabled, errors }: RatingControllerProps,
    ref
  ) => {
    const onKeyDown = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    };

    const { t } = useTranslation();

    return (
      <>
        <div className="mb-5">
          <FormInputLabel name={`${t(cs['review'])}*`} />
        </div>
        <Controller
          name={name}
          control={control}
          rules={{
            required: { value: true, message: t(cs['review_required_stars']) },
          }}
          defaultValue={defaultValue}
          render={({ field }) => (
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <span className="mr-1" key={index}>
                    <RatingIcon
                      index={index}
                      rating={field.value ? field.value : 0}
                      hoverRating={field.value ? field.value : 0}
                      onSaveRating={field.onChange}
                      isDisabled={isDisabled}
                    />
                  </span>
                );
              })}
            </div>

            // <Select<RatingOption>
            //   {...field}
            //   styles={customStyles}
            //   options={ratingOptions}
            //   noOptionsMessage={() => 'Žiadne ďaľšie výsledky'}
            //   isDisabled={isDisabled}
            //   placeholder="ahoj"
            //   isSearchable={true}
            //   onKeyDown={onKeyDown}
            // />
          )}
        />
      </>
    );
  }
);

export default RatingController;
