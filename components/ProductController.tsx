/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import Select, { components } from 'react-select';
import { customStyles as style } from '../utils/formStyles';
import {
  GetDashboardQuery,
  SelectCatFieldsFragment,
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
import { Components } from 'react-select/src/components';

type ReviewSubmissionTypeForm = {
  cat: SelectCatFieldsFragment;
  product: SelectProductFieldsFragment;
  rating: string;
};

const Option: Components['Option'] = ({ children, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="mr-4 flex flex-row items-center cursor-pointer">
        {props.data.__typename === 'Product' && (
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

interface ProductControllerProps<T extends unknown> {
  searchProducts: GetDashboardQuery['selectProducts'];
  onInputChange: (value: React.SetStateAction<string>) => void;
  props?: Array<string>;
  control?: Control<T>;
  showHint: boolean;
  defaultValue?: SelectProductFieldsFragment;
  isDisabled?: boolean;
  errors?: DeepMap<ReviewSubmissionTypeForm, FieldError>;
  name?: string;
}

const ProductController = forwardRef<
  HTMLInputElement,
  ProductControllerProps<unknown>
>(
  (
    {
      searchProducts,
      onInputChange,
      props,
      control,
      showHint,
      defaultValue,
      isDisabled,
      name = 'product',
      errors,
    }: ProductControllerProps<unknown>,
    ref
  ): JSX.Element => {
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
          {errors && errors['product'] && (
            <FormErrorMessage error={t(cs['product_required'])} />
          )}
        </div>
      </>
    );
  }
);

export default ProductController;
