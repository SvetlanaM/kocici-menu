import { forwardRef } from 'react';
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
} from 'react-hook-form';
import FormInputLabel from './FormInputLabel';
import RatingIcon from './RatingIcon';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface RatingControllerProps<T extends FieldValues> {
  props?: Array<string>;
  name: Path<T>;
  control?: Control<T>;
  isDisabled?: boolean;
  placeholder?: string;
  defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>>;
  errors?: DeepMap<T, FieldError>;
}

const RatingController = forwardRef(
  <T extends FieldValues>(
    {
      name,
      control,
      defaultValue,
      isDisabled,
      errors,
    }: RatingControllerProps<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ): JSX.Element => {
    const { t } = useTranslation();

    return (
      <>
        <div className="mb-3 xl-custom:mb-5">
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
                  <span className="mr-5 xl-custom:mr-1" key={index}>
                    <RatingIcon
                      index={index}
                      rating={field.value ? field.value : 0}
                      handleOnSaveRating={field.onChange}
                      isDisabled={isDisabled}
                      errors={errors}
                    />
                  </span>
                );
              })}
            </div>
          )}
        />
      </>
    );
  }
);

export default RatingController;
