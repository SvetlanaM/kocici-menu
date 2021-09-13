import { ApolloError } from '@apollo/client';
import { userInfo } from 'os';
import { useEffect, useState } from 'react';
import useLogger from '../hooks/useLogger';
import Link from 'next/link';
import Image from './Image';
import { SVETA_EMAIL } from '../utils/constants';

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
          userMessage: 'Ajaj...nieco sa pokazilo',
          errorType: 'error',
          message: error && error.message,
        };
      case error.networkError:
        return {
          error: error.networkError,
          userMessage: 'Chyba v stahovani dat',
          errorType: 'error',
          message: error.networkError?.message,
        };
    }
  }
}

const ErrorScreen = ({ error, userMessage }: ErrorScreenProps) => {
  const logger = useLogger();
  const [errorMessage, setErrorMessage] = useState<string>(userMessage);

  useEffect(() => {
    logger(error);
    setErrorMessage(error.userMessage);
  }, [logger, error, setErrorMessage]);

  return (
    <div className="flex justify-center flex-col min-h-auto items-center py-16">
      <Image src="/icons/no-data.svg" height={205} width={300} />
      <h2 className="text-2xl font-medium text-purple-darkest mt-5">
        {errorMessage}
      </h2>
      <p className="font-light px-32 text-center pt-3.6 pb-4 text-purple-darkest leading-normal">
        Ak by problem pretrvaval dlhodobo, kontaktujte nas prostrednictvom{' '}
        <a
          href={`mailto:${SVETA_EMAIL}`}
          className="text-purple-light hover:text-purple-dark"
        >
          emailu
        </a>
        . Na naprave budeme usilovne pracovat.
      </p>
    </div>
  );
};

ErrorScreen.defaultProps = {
  defaultMessage: 'Neznama chyba',
};

export default ErrorScreen;
