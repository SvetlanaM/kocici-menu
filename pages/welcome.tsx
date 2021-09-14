import Layout from '../components/Layout';
import Header from '../components/Head';
import getTitle from '../utils/getTitle';
import WelcomeBox from '../components/WelcomeBox';
import Link from 'next/link';
import { APP_NAME } from '../utils/constants';
import { useMutation } from '@apollo/client';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User_Insert_Input,
  useUserSeenStateQuery,
} from '../graphql/generated/graphql';
import { UPDATE_USER_PREFERENCES } from '../graphql/mutations';
import { getUser } from '../utils/user';
import { useEffect } from 'react';
import router, { NextRouter, useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
export default function Welcome() {
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER_PREFERENCES);

  const catUpdateInput: User_Insert_Input = {
    seen_tutorial: true,
  };

  useEffect(() => {
    updateUser({
      variables: { id: getUser(), users: catUpdateInput },
    });
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <Header title={getTitle(t(sk['welcome']))} />
      <WelcomeBox />
    </>
  );
}
