import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import FormErrorMessage from './FormErrorMessage';
import FormInputWrapper from './FormInputWrapper';
import FormInputLabel from './FormInputLabel';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

import { useIdentityContext } from 'react-netlify-identity';
import { useState } from 'react';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
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

  i18next.init({
    lng: 'sk',
    debug: false,
    resources: {
      sk: {
        translation: {
          invalid_grant_email_not_confirmed: 'Email nie je potvrdený.',
          a_user_with_this_email_address_has_already_been_registered:
            'Užívateľ s touto emailovou adresou už existuje. Zadajte iný email.',
          invalid_grant_no_user_found_with_that_email_or_password_invalid:
            'Používateľ s touto email adresou nenájdený alebo zle zadané heslo.',
        },
      },
    },
  });

  const { t } = useTranslation();

  const convertErrString = (message: string) => {
    let newMessage = message
      .replaceAll(':', '')
      .replaceAll(' ', '_')
      .replaceAll(',', '')
      .replaceAll('.', '')
      .toLowerCase();
    console.log(newMessage.toLowerCase());
    return newMessage.toLowerCase();
  };

  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { signupUser, loginUser } = useIdentityContext();

  const onSubmit = (data: any) => {
    if (authMethod === 'signupUser') {
      signupUser(data.email, data.password, {
        data: 'signed up thru react-netlify-identity',
      })
        .then(() =>
          setSuccessMessage(
            'Registrácia úspešná. Potvrdenie je zaslané na registračný email.'
          )
        )
        .then(() => setMessage(''))
        .then(() => router.push('/welcome'))
        .catch((err) => setMessage(i18next.t(convertErrString(err.message))));
    }

    if (authMethod === 'loginUser') {
      loginUser(data.email, data.password)
        .then((data) => router.push('/'))
        .catch((err) => setMessage(i18next.t(convertErrString(err.message))));
    }
  };

  const hasUppercaseLetter = (value: string) => {
    if (authMethod === 'signupUser') {
      for (let char of value) {
        if (char.toUpperCase() === char && !/^\d+$/.test(char)) {
          return true;
        }
        return false;
      }
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
        <div className="mb-7">
          <FormInputWrapper>
            <FormInputLabel name="Email*" />
            <FormInput
              registerRules={{
                ...register('email', {
                  required: { value: true, message: 'Email je povinný' },
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
                  required: { value: true, message: 'Heslo je povinné' },
                  validate: {
                    hasUppercaseLetter: hasUppercaseLetter,
                  },
                  minLength: {
                    value: 8,
                    message: 'Heslo musí mať najmenej 8 znakov',
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
            {errors.password &&
              errors.password.type === 'hasUppercaseLetter' && (
                <FormErrorMessage
                  error={'Heslo musí obsahovať aspoň jedno veľké písmeno'}
                />
              )}
          </FormInputWrapper>
        </div>
        <SubmitButton text={submitText} disabled={false} size="w-full" />
      </form>
    </div>
  );
};
export default AuthForm;
