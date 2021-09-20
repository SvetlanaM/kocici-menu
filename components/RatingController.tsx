import { forwardRef } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import FormInputLabel from './FormInputLabel';
import RatingIcon from './RatingIcon';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface RatingControllerProps {
  props?: Array<string>;
  name: string;
  control?: Control<FieldValues>;
  isDisabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

const RatingController = forwardRef<HTMLInputElement, RatingControllerProps>(
  ({
    name,
    control,
    defaultValue,
    isDisabled,
  }: RatingControllerProps): JSX.Element => {
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
                      handleOnSaveRating={field.onChange}
                      isDisabled={isDisabled}
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
