import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';
import useLogger from '../hooks/useLogger';

interface ErrorScreenProps {
  error: GeneralError;
  defaultMessage: string;
}

export class GeneralError {
  constructor(
    public error: Error,
    public message: string | null = error.message,
    public userMessage: string | null = null,
    public imageURL: string | null = null
  ) {}

  static fromApolloError(error: ApolloError): GeneralError {
    return new this(error, error.networkError?.message || error.message);
  }

  static fromString(message: string): GeneralError {
    return new this(new Error(message));
  }
}

const ErrorScreen = ({ error, defaultMessage }: ErrorScreenProps) => {
  const logger = useLogger();
  const [errorMessage, setErrorMessage] = useState<string>(defaultMessage);

  if (error.message) {
    error.userMessage = 'Chyba v stahovani dat';
  }

  useEffect(() => {
    logger(error);
    setErrorMessage(error.userMessage || defaultMessage);
  }, [logger, error, setErrorMessage]);

  return (
    <>
      <div
        className="block p-5 h-auto bg-red-200 border-rounded-base border-red-300"
        role="alert"
      >
        <p className="font-bold">Chyba</p>
        {errorMessage}
      </div>
    </>
  );
};

ErrorScreen.defaultProps = {
  defaultMessage: 'Neznama chyba',
};

export default ErrorScreen;
