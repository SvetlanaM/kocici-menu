import { StylesConfig } from 'react-select';
import {
  CatFieldsFragmentFragment,
  SelectBrandTypeFieldsFragment,
  SelectCatFieldsFragment,
  SelectProductTypeFieldsFragment,
} from '../graphql/generated/graphql';

type IsMulti = true | false;
interface RatingOption {
  value: number;
  label: string;
}

export const customStyles: StylesConfig<
  | SelectCatFieldsFragment
  | SelectBrandTypeFieldsFragment
  | RatingOption
  | SelectProductTypeFieldsFragment
  | CatFieldsFragmentFragment,
  IsMulti
> = {
  control: (styles, { isFocused, isDisabled }) => ({
    ...styles,
    display: 'flex',
    color: '#4B4261',
    border: '1px solid #E1E5EE',
    borderBottom: '1px solid #E1E5EE',
    backgroundColor: isDisabled ? 'white' : null,
    boxShadow: isFocused ? '1px solid #E1E5EE' : '0px',
    '&:hover': {
      border: isFocused ? null : '1px solid #B3BACC',
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      padding: 20,
      borderBottom: '1px solid #E1E5EE',
      color: isDisabled
        ? '#4B4261'
        : isSelected
        ? '#B3BACC'
        : isFocused
        ? '#BDBDE7'
        : '#4B4261',
      cursor: isDisabled ? 'not-allowed' : 'default',
      backgroundColor: isDisabled
        ? 'red'
        : isSelected
        ? 'white'
        : isFocused
        ? 'white'
        : null,
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? null : 'white'),
      },
    };
  },
  input: (styles) => {
    return {
      ...styles,
      color: '#4B4261',
    };
  },
  placeholder: (styles) => ({
    ...styles,
    color: '#B3BACC',
    fontWeight: 'lighter',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#4B4261',
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: '#4B4261',
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: '#bdbde',
    };
  },
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#4B4261',
    ':hover': {
      backgroundColor: '#4B4261',
      color: 'white',
    },
  }),
};
