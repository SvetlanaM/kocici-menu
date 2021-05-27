export const customStyles = {
    control: (styles, { isHovered, isFocused, isDisabled }) => ({
      ...styles,
      display: 'flex',
      color: '#4B4261',
      border: isHovered ? null : '1px solid #E1E5EE',
      borderBottom: isHovered ? null : '1px solid #E1E5EE',
      backgroundColor: isDisabled ? 'white' : null,
      // This line disable the blue border
      boxShadow: isFocused ? '1px solid #E1E5EE' : 0,
      '&:hover': {
        border: isFocused ? null : '1px solid #B3BACC',
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected, isHovered }) => {
      const color = '#4B4261';
      return {
        ...styles,
        padding: 20,
        borderBottom: isHovered ? null : '1px solid #E1E5EE',
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
      fontWeight: 'light',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#4B4261',
    }),
    noOptionsMessage: (styles) => ({
      ...styles,
      color: '#4B4261',
  }),
    multiValue: (styles, { data }) => {
    const color = '#4B4261'
    return {
      ...styles,
      backgroundColor: '#bdbde',
    };
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#4B4261',
    ':hover': {
      backgroundColor: '#4B4261',
      color: 'white',
    },
  }),
  };