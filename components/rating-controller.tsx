import { Control, Controller, FieldValues } from 'react-hook-form';
import Select, { components } from 'react-select';
import { customStyles as style } from '../utils/form-styles';
import FormInputLabel from './form-input-label';
const customStyles = style;

interface RatingControllerProps {
  props?: Array<string>;
  name: string;
  control?: Control<FieldValues>;
  isDisabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
}
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

const RatingController = ({
  name,
  control,
  isDisabled,
  placeholder,
  defaultValue,
}: RatingControllerProps) => {
  return (
    <>
      <div className="mb-2">
        <FormInputLabel name="Hodnotenie*" />
      </div>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select<RatingOption>
            {...field}
            styles={customStyles}
            options={ratingOptions}
            noOptionsMessage={() => 'Žiadne ďaľšie výsledky'}
            isDisabled={isDisabled}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default RatingController;
