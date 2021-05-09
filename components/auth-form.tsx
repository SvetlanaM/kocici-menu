import { useForm } from 'react-hook-form';
import { SVETA_EMAIL } from '../utils/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormErrorMessage from './form-error-message';
import FormLegend from './form-legend';
import FormInputWrapper from './form-input-wrapper';
import FormInputLabel from './form-input-label';
import FormInput from './form-input';
import FormSelectBox from './form-select-box';
import BackButton from '../components/back-button';
import SubmitButton from '../components/submit-button';
import { setToken } from '../utils/token';
import { useIdentityContext } from 'react-netlify-identity';
import { useState } from 'react';
import Modal from 'react-modal';

interface AuthFormProps {
  submitText: string;
  passwordPlaceholder: string;
  authMethod: string;
}

const AuthForm = ({
  authMethod,
  submitText,
  passwordPlaceholder,
}: AuthFormProps) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { signupUser, loginUser } = useIdentityContext();

  const onSubmit = (data: any) => {
    if (authMethod === 'signupUser') {
      signupUser(data.email, data.password, {
        data: 'signed up thru react-netlify-identity',
      })
        .then((user) => setToken(String(user?.user_metadata.my_token)))
        .then(() =>
          setSuccessMessage('Registracia uspesna. Potvrdte emailovu adresu.')
        )
        .catch((err) => setMessage(err.message));
    }

    if (authMethod === 'loginUser') {
      loginUser(data.email, data.password)
        .then((user) => setToken(String(user?.user_metadata.my_token)))
        .then(() => router.push('/'))
        .catch((err) => setMessage(err.message));
    }
  };

  return (
    <div>
      {message && (
        <div className="w-full bg-red-300 text-white rounded-md py-2 px-3 mb-4">
          {message}
        </div>
      )}
      {successMessage && (
        <div className="w-full bg-green-300 text-white rounded-md py-2 px-3 mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="">
          <FormInputWrapper>
            <FormInputLabel name="Email*" />
            <FormInput
              registerRules={{
                ...register('email', {
                  required: { value: true, message: 'Email je povinny' },
                }),
              }}
              type="email"
              placeholder="email@email.sk"
              errors={errors.email}
            />
            {errors.email && <FormErrorMessage error={errors.email?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name="Heslo*" />
            <FormInput
              registerRules={{
                ...register('password', {
                  required: { value: true, message: 'Heslo je povinne' },
                  minLength: {
                    value: 8,
                    message: 'Heslo musi mat najmenej 8 znakov',
                  },
                }),
              }}
              type="password"
              placeholder={passwordPlaceholder}
              errors={errors.password}
            />
            {errors.password && (
              <FormErrorMessage error={errors.password?.message} />
            )}
          </FormInputWrapper>
        </div>
        <SubmitButton text={submitText} disabled={false} size="w-full" />
      </form>
    </div>
  );
};
export default AuthForm;
