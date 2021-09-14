import { useForm, useFormState } from 'react-hook-form';
import { useRouter } from 'next/router';
import FormErrorMessage from './FormErrorMessage';
import FormInputWrapper from './FormInputWrapper';
import FormInputLabel from './FormInputLabel';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import Link from 'next/link';
import { useIdentityContext } from 'react-netlify-identity';
import { useState } from 'react';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useUserSeenStateQuery } from '../graphql/generated/graphql';
import { getUser, user_id } from '../utils/user';
import RoutingPath from '../pages/routing-path';
import useLogger from '../hooks/useLogger';
import sk from '../public/locales/sk/common.json';
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
    control,
    formState: { errors, isDirty, touchedFields, isValid },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const { dirtyFields } = useFormState({
    control,
  });

  i18next.init({
    lng: 'sk',
    debug: false,
    resources: {
      sk: {
        translation: {
          invalid_grant_email_not_confirmed:
            'Emailova adresa nie je zatial potvrdena. Skontrolujte si prichadzajuce emaily alebo spam zlozku.',
          a_user_with_this_email_address_has_already_been_registered:
            'Užívateľ s touto emailovou adresou už existuje. Zadajte prosim iný email.',
          invalid_grant_no_user_found_with_that_email_or_password_invalid:
            'Užívateľ s touto emailovou adresou nenájdený alebo zle zadana kombinacia emailu a hesla.',
          cannot_read_property_auth_of_undefined:
            'Chyba v internetovom pripojení. Opakujte vasu poziadavku neskôr.',
          server_se_zadaným_názvem_hostitele_nelze_nalézt:
            'Chyba v internetovom pripojení. Opakujte vasu poziadavku neskôr.',
          failed_to_fetch:
            'Chyba v internetovom pripojení. Opakujte vasu poziadavku neskôr.',
        },
      },
    },
  });

  const { t } = useTranslation();
  const logger = useLogger();

  const convertErrString = (message: string) => {
    let newMessage = message
      .replaceAll(':', '')
      .replaceAll(' ', '_')
      .replaceAll(',', '')
      .replaceAll('.', '')
      .replaceAll("'", '')
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
        .then(() => setSuccessMessage(t(sk['registration_success'])))
        .then(() => setMessage(''))
        .then(() =>
          loginUser(data.email, data.password).then(() =>
            router.push('/routing-path')
          )
        )
        .catch((err) => setMessage(i18next.t(convertErrString(err.message))))
        .catch((err) => logger(err.message, 'error'));
    }

    if (authMethod === 'loginUser') {
      loginUser(data.email, data.password)
        .then((data) => router.push('/routing-path'))
        .then(() => logger(null, 'success', 'login', user_id))
        .catch((err) => setMessage(i18next.t(convertErrString(err.message))))
        .catch((err) => logger(err.message, 'error'));
    }
  };

  const hasUppercaseLetter = (value: string) => {
    if (authMethod === 'signupUser') {
      for (let char of value) {
        if (char.toUpperCase() === char && !/^\d+$/.test(char)) {
          return true;
        }
      }
      return false;
    }
  };

  return (
    <div>
      {message && (
        <div className="w-full bg-red-500 text-white rounded-md py-2 px-3 mb-4">
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
            <FormInputLabel name={`${t(sk['email'])}*`} />
            <FormInput
              {...register('email', {
                required: { value: true, message: t(sk['email_required']) },
              })}
              name="email"
              type="email"
              placeholder={t(sk['email_placeholder'])}
              errors={errors.email && errors.email}
              aria-invalid={errors.email}
            />
            {errors.email && <FormErrorMessage error={errors.email?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={`${t(sk['password'])}*`} />
            <FormInput
              placeholder={passwordPlaceholder}
              errors={errors.password && errors.password}
              type="password"
              name="password"
              {...register('password', {
                required: { value: true, message: t(sk['password_required']) },
                validate: {
                  hasUppercaseLetter: hasUppercaseLetter,
                },
                minLength: {
                  value: 8,
                  message: t(sk['password_rule_min_length']),
                },
              })}
            />
            {errors.password && (
              <FormErrorMessage error={errors.password?.message} />
            )}
            {errors.password &&
              errors.password.type === 'hasUppercaseLetter' && (
                <FormErrorMessage error={t(sk['password_rule_sign'])} />
              )}
          </FormInputWrapper>
        </div>

        <SubmitButton text={submitText} disabled={false} size="w-full" />
        {authMethod === 'signupUser' ? (
          <div className="text-gray text-sm leading-normal font-light">
            {t(sk['registration_info'])}{' '}
            <Link href="/terms-and-conditions">
              <a target="new" className="text-purple-light hover:text-purple">
                {t(sk['rules'])}
              </a>
            </Link>{' '}
            {t(sk['and_i_know'])}{' '}
            <Link href="/gdpr-conditions">
              <a target="new" className="text-purple-light hover:text-purple">
                {t(sk['my_privacy'])}
              </a>
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
};
export default AuthForm;
