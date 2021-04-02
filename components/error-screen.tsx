import { ApolloError } from '@apollo/client';
import { useEffect, useState } from 'react';
import useLogger from '../hooks/useLogger';

interface ErrorScreenProps {
  error: ApolloError;
}

const errorType = {
  graphqlError: {
    setCustomMessage() {
      return 'Chyba 1';
    },
  },
  networkError: {
    setCustomMessage() {
      return 'Chyba 2';
    },
  },
};

const ErrorScreen = ({ error }: ErrorScreenProps) => {
  const logger = useLogger();
  const [errorMessage, setErrorMessage] = useState<string>('Neznama chyba');

  const getErrorMessage = (error: ApolloError): string => {
    let errorResponse = errorMessage;
    if (error.graphQLErrors) {
      errorResponse = errorType.graphqlError.setCustomMessage();
    }

    if (error.networkError) {
      errorResponse = errorType.networkError.setCustomMessage();
    }

    return errorResponse;
  };

  useEffect(() => {
    logger(error);
    setErrorMessage(getErrorMessage(error));
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

export default ErrorScreen;
