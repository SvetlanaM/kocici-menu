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
import FormErrorMessage from './FormErrorMessage';
import ProductImage from './ProductImage';
const customStyles = style;
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import { forwardRef } from 'react';

const Option = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="mr-4 flex flex-row items-center cursor-pointer">
        {props.data.__typename === 'Product' && (
          // <img
          //   src={props.data.image_url}
          //   className="object-fill h-10 w-10 mr-4 float-right"
          // />
          <ProductImage
            src={props.data.image_url}
            alt={props.data.name}
            type="search"
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
  errors?: any;
}

const ProductController = forwardRef(
  (
    {
      searchProducts,
      onInputChange,
      watchedProduct,
      props,
      name,
      control,
      showHint,
      defaultValue,
      isDisabled,
      errors,
    }: ProductControllerProps,
    ref
  ) => {
    console.log(errors.fieldArray && errors.fieldArray);
    const { t } = useTranslation();
    return (
      <>
        {showHint ? (
          <>
            <div className="flex justify-between mb-3">
              <FormInputLabel name={t(cs['product'])} />
              <div className="text-purple-light text-xs mt-1.5 pl-0.5 hidden xl-custom:block">
                {t(cs['no_product_find'])}{' '}
                <Link href={`mailto: ${SVETA_EMAIL}`}>
                  <a className="hover:underline">{t(cs['write_me'])}</a>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-2">
            <FormInputLabel name={t(cs['product'])} />
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
              placeholder={t(cs['search_product'])}
              // value={watchedProduct}
              noOptionsMessage={() => t(cs['no_results'])}
              isDisabled={isDisabled}
            />
          )}
          name={name}
          control={control}
          rules={{ required: true }}
          defaultValue={defaultValue}
        />
        <div className="mt-3">
          {errors && errors[name] && (
            <FormErrorMessage error={t(cs['product_required'])} />
          )}
        </div>
      </>
    );
  }
);

export default ProductController;
