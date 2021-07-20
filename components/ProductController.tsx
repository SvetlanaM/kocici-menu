import { Control, Controller, FieldValues } from 'react-hook-form';
import Select, { components } from 'react-select';
import { customStyles as style } from '../utils/formStyles';
import {
  GetDashboardQuery,
  SelectProductFieldsFragment,
} from '../graphql/generated/graphql';
import { SVETA_EMAIL } from '../utils/constants';
import Link from 'next/link';
import FormInputLabel from './FormInputLabel';
const customStyles = style;

const Option = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="mr-3 flex flex-row items-center">
        {props.data.__typename === 'Product' && (
          <img
            src={props.data.image_url}
            className="object-fill h-10 w-10 mr-4 float-right"
          />
        )}
        {children}
      </div>
    </components.Option>
  );
};

interface ProductControllerProps {
  searchProducts: GetDashboardQuery['selectProducts'];
  onInputChange: (value: React.SetStateAction<string>) => void;
  watchedProduct?: SelectProductFieldsFragment;
  props?: Array<string>;
  name: string;
  control?: Control<FieldValues>;
  showHint: boolean;
  defaultValue?: string;
  isDisabled?: boolean;
}

const ProductController = ({
  searchProducts,
  onInputChange,
  watchedProduct,
  props,
  name,
  control,
  showHint,
  defaultValue,
  isDisabled,
}: ProductControllerProps) => {
  return (
    <>
      {showHint ? (
        <>
          <div className="flex justify-between mb-3">
            <FormInputLabel name="Produkt*" />
            <div className="text-purple-light text-xs mt-1.5 pl-0.5 hidden xl-custom:block">
              Nenašli ste hľadaný produkt?{' '}
              <Link href={`mailto: ${SVETA_EMAIL}`}>
                <a className="hover:underline">Napíšte mi :)</a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="mb-2">
          <FormInputLabel name="Produkt*" />
        </div>
      )}

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
              `${product.brand_type} - ${product.name}`
            }
            onInputChange={onInputChange}
            placeholder={'Vyhľadať produkt od 3 znakov'}
            // value={watchedProduct}
            noOptionsMessage={() => 'Žiadne ďalšie výsledky'}
            isDisabled={isDisabled}
          />
        )}
        name={name}
        control={control}
        rules={{ required: true }}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default ProductController;
