import { StylesConfig } from 'react-select';
import {
  SelectBrandTypeFieldsFragment,
  SelectCatFieldsFragment,
  SelectProductFieldsFragment,
  SelectProductTypeFieldsFragment,
} from '../graphql/generated/graphql';
import { MeatSort, RatingOption } from '../components/FilterForm'

type IsMulti = true | false;

export const errorStyles: StylesConfig<
  | SelectCatFieldsFragment
  | SelectBrandTypeFieldsFragment
  | RatingOption
  | SelectProductTypeFieldsFragment
  | SelectProductFieldsFragment
  | MeatSort,
  IsMulti
> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: 'rgba(239, 68, 68)',
    borderWidth: '1px',
    '&:hover': {
      borderColor: 'red',
      border: isFocused ? null : '1px solid #B3BACC',
    },
    boxShadow: isFocused ? '1px solid #E1E5EE' : '0px',
  }),
};

export const customStyles: StylesConfig<
  | SelectCatFieldsFragment
  | SelectBrandTypeFieldsFragment
  | RatingOption
  | SelectProductTypeFieldsFragment
  | SelectProductFieldsFragment
  | MeatSort,
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
