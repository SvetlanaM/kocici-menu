import { useCallback } from 'react';
import { GeneralError } from '../components/ErrorScreen';
import { useMutation } from '@apollo/client';
import {
  AddLogMutation,
  AddLogMutationVariables,
  Logging_Insert_Input,
} from '../graphql/generated/graphql';
import { ADD_LOG } from '../graphql/mutations';

const useLogger = () => {
  const [insertLog] = useMutation<AddLogMutation, AddLogMutationVariables>(
    ADD_LOG
  );

  return useCallback(
    (
      error?: GeneralError,
      errorType = 'error',
      customErrorMessage?: string,
      userId?: string
    ) => {
      const logInsert: Logging_Insert_Input = {
        error_message: (error && error.message) || customErrorMessage,
        error_type: errorType,
        user_id: userId,
      };
      insertLog({
        variables: { log: logInsert },
      });
    },
    []
  );
};

export default useLogger;
