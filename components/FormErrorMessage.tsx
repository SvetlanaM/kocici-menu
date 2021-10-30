import { FieldError } from 'react-hook-form';

interface FormErrorMessageProps {
  error: string | FieldError;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps): JSX.Element => {
  return <span className="block text-red-500">{error}</span>;
};

export default FormErrorMessage;
