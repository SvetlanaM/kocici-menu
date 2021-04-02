import { ApolloError } from '@apollo/client';
import { useCallback } from 'react'


const useLogger = () => {
    return useCallback((error: ApolloError) => {
        console.log("Report this error: ", error.message || error.networkError?.message);
    }, []);
};

export default useLogger;