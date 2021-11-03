import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';
import useLogger from '../hooks/useLogger';
import Image from './Image';
import { SVETA_EMAIL } from '../utils/constants';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface ErrorScreenProps {
  error: GeneralError;
  userMessage?: GeneralError['userMessage'];
}

export class GeneralError {
  constructor(
    public error: Error,
    public message: string | null = error.message,
    public userMessage: string | null = null,
    public errorType: string | null = null
  ) {}

  static fromApolloError(error: ApolloError): GeneralError {
    switch (error) {
      case error:
        return {
          error: error,
          userMessage: 'general_error',
          errorType: 'error',
          message: error && error.message,
        };
      case error.networkError:
        return {
          error: error.networkError,
          userMessage: 'data_error',
          errorType: 'error',
          message: error.networkError?.message,
        };
    }
  }
}

const ErrorScreen = ({ error, userMessage }: ErrorScreenProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>(userMessage);
  const logger = useLogger();
  const { t } = useTranslation();

  useEffect(() => {
    logger(error);
    setErrorMessage(error.userMessage);
  }, [logger, error, setErrorMessage]);

  return (
    <div className="flex justify-center flex-col min-h-auto items-center py-16">
      <Image src="/icons/no-data.svg" height={205} width={300} />
      <h2 className="text-2xl font-medium text-purple-darkest mt-5">
        {t(cs[errorMessage])}
      </h2>
      <p className="font-light px-10 md:px-32 text-center pt-3.6 pb-4 text-purple-darkest leading-normal">
        {t(cs['error_message'])}{' '}
        <a
          href={`mailto:${SVETA_EMAIL}`}
          className="text-purple-light hover:text-purple-dark"
        >
          {t(cs['emailu'])}
        </a>
        {t(cs['error_solution'])}
      </p>
    </div>
  );
};

export default ErrorScreen;
