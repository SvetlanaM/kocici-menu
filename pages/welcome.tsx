import Header from '../components/Head';
import getTitle from '../utils/getTitle';
import WelcomeBox from '../components/WelcomeBox';
import { useMutation } from '@apollo/client';
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User_Insert_Input,
} from '../graphql/generated/graphql';
import { UPDATE_USER_PREFERENCES } from '../graphql/mutations';
import { getUser } from '../utils/user';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

export default function Welcome(): JSX.Element {
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
      <Header title={getTitle(t(cs['welcome']))} />
      <WelcomeBox />
    </>
  );
}
