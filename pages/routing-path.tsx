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
import Welcome from './welcome';
import Home from './products';
import Loading from '../components/Loading';

const DashboardCatQuery = () => {
  const { data: data } = useUserSeenStateQuery({
    variables: {
      user_id: getUser(),
    },
    fetchPolicy: 'no-cache',
  });

  if (data && data.user.seen_tutorial) {
    return '/dashboard';
  }

  if (data && !data.user.seen_tutorial) {
    return '/welcome';
  }
};

export default function RoutingPath() {
  const router = useRouter();
  const url = DashboardCatQuery();
  url && router.push(url);
  return <Loading />;
}
