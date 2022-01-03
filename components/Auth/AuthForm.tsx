import { SubmitHandler, useForm } from 'react-hook-form';
import FormErrorMessage from '../FormErrorMessage';
import FormInputWrapper from '../FormInputWrapper';
import FormInputLabel from '../FormInputLabel';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import Link from 'next/link';
import { useIdentityContext } from 'react-netlify-identity';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { user_id } from '../../utils/user';
import useLogger from '../../hooks/useLogger';
import cs from '../../public/locales/cs/common.json';

interface AuthFormProps {
  submitText: string;
  passwordPlaceholder: string;
  authMethod: string;
}

type AuthSubmissionTypeForm = {
  email: string;
  password: string;
};

const AuthForm = ({
  authMethod,
  submitText,
  passwordPlaceholder,
}: AuthFormProps): JSX.Element => {
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { t } = useTranslation();
  const logger = useLogger();
  const { signupUser, loginUser } = useIdentityContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthSubmissionTypeForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const convertErrString = (message: string) => {
    const newMessage = message
      .replaceAll(':', '')
      .replaceAll(' ', '_')
      .replaceAll(',', '')
      .replaceAll('.', '')
      .replaceAll("'", '')
      .toLowerCase();
    return newMessage.toLowerCase();
  };

  const onSubmit: SubmitHandler<AuthSubmissionTypeForm> = (data) => {
    if (authMethod === 'signupUser') {
      signupUser(data.email, data.password, {}, true)
        .then(() => setSuccessMessage(t(cs['registration_success'])))
        .then(() => setMessage(''))
        .then(() => loginUser(data.email, data.password, true))
        .catch((err) => setMessage(t(cs[convertErrString(err.message)])))
        .catch((err) => logger(err.message, 'error'));
    }

    if (authMethod === 'loginUser') {
      loginUser(data.email, data.password, true)
        .then(() => logger(null, 'success', 'login', user_id))
        .catch((err) => setMessage(t(cs[convertErrString(err.message)])))
        .catch((err) => logger(err.message, 'error'));
    }
  };

  const hasUppercaseLetter = (value: string): boolean => {
    if (authMethod === 'signupUser') {
      for (const char of value) {
        if (char.toUpperCase() === char && /^[A-Z]+$/.test(char)) {
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
            <FormInputLabel name={`${t(cs['email'])}*`} />
            <FormInput
              registerRules={register('email', {
                required: { value: true, message: t(cs['email_required']) },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: t(cs['email_bad_format']),
                },
              })}
              name="email"
              type="email"
              placeholder={t(cs['email_placeholder'])}
              errors={errors.email && errors.email}
              aria-invalid={errors.email}
            />
            {errors.email && <FormErrorMessage error={errors.email?.message} />}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormInputLabel name={`${t(cs['password'])}*`} />
            <FormInput
              placeholder={passwordPlaceholder}
              errors={errors.password && errors.password}
              type={!showPassword ? 'password' : 'text'}
              name="password"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              passClass={!showPassword ? 'show-pass' : 'hide-pass'}
              registerRules={
                authMethod === 'signupUser'
                  ? register('password', {
                      required: {
                        value: true,
                        message: t(cs['password_required']),
                      },
                      validate: {
                        hasUppercaseLetter: hasUppercaseLetter,
                      },
                      minLength: {
                        value: 8,
                        message: t(cs['password_rule_min_length']),
                      },
                    })
                  : register('password', {
                      required: {
                        value: true,
                        message: t(cs['password_required']),
                      },
                    })
              }
            />
            {errors.password && (
              <FormErrorMessage error={errors.password?.message} />
            )}
            {errors.password &&
              errors.password.type === 'hasUppercaseLetter' && (
                <FormErrorMessage error={t(cs['password_rule_sign'])} />
              )}
          </FormInputWrapper>
        </div>
        <SubmitButton text={submitText} disabled={false} size="w-full" />
        {authMethod === 'signupUser' ? (
          <div className="text-gray text-sm leading-normal font-light">
            {t(cs['registration_info'])}{' '}
            <Link href="/terms-and-conditions">
              <a target="new" className="text-purple-light hover:text-purple">
                {t(cs['rules'])}
              </a>
            </Link>{' '}
            {t(cs['and_i_know'])}{' '}
            <Link href="/gdpr-conditions">
              <a target="new" className="text-purple-light hover:text-purple">
                {t(cs['my_privacy'])}
              </a>
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
};
export default AuthForm;
