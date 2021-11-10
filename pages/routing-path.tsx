import { useUserSeenStateQuery } from '../graphql/generated/graphql';
import { getUser } from '../utils/user';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

const DashboardCatQuery = () => {
  const { data: data } = useUserSeenStateQuery({
    variables: {
      user_id: getUser(),
    },
    fetchPolicy: 'no-cache',
  });

  if (data && data.user.seen_tutorial && typeof window !== 'undefined') {
    return '/dashboard';
  }

  if (data && !data.user.seen_tutorial && typeof window !== 'undefined') {
    return '/welcome';
  }
};

export default function RoutingPath(): JSX.Element {
  const router = useRouter();
  const url = DashboardCatQuery();
  url && router.push(url);

  return <Loading />;
}
