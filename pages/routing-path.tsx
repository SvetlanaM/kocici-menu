import { useUserSeenStateQuery } from '../graphql/generated/graphql';
import { getUser } from '../utils/user';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

const getUrl = () => {
  const { data: data, error: error } = useUserSeenStateQuery({
    variables: {
      user_id: getUser(),
    },
    fetchPolicy: 'no-cache',
  });

  if (data && data.user?.seen_tutorial && typeof window !== 'undefined') {
    return '/dashboard';
  }

  if (data && !data.user?.seen_tutorial && typeof window !== 'undefined') {
    return '/welcome';
  }

  if (error) {
    return '/dashboard';
  }

  return null;
};

export default function RoutingPath(): JSX.Element {
  const router = useRouter();
  const url = getUrl();
  url && router.push(url);
  return <Loading />;
}
