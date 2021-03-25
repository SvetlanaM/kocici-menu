import { DocumentNode, useQuery } from '@apollo/client';

interface Props<Data> {
  children: (data: Data) => React.ReactElement;
  query: DocumentNode;
}
const Main = <T extends unknown>({
  children,
  query,
}: Props<T>): JSX.Element => {
  const { loading, error, data } = useQuery<any>(query);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return <div>No data!</div>;
  return (
    <div className="w-full flex-col-base pt-9.5 p-8 overflow-x-hidden">
      {children(data)}
    </div>
  );
};

export default Main;
