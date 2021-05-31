import Title from './title';
import TipBox from './tip-box';
import InnerContainer from './inner-container';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import truncateText from '../utils/truncate-text';
interface TipProps {
  data: GetDashboardQuery['tips'];
}

const Tips = ({ data }: TipProps) => {
  return (
    <InnerContainer flexType="flex-col">
      <Title title="Najnovšie tipy a odporúčania" />
      <div className={`grid grid-cols-1 grid-flow-row gap-x-11`}>
        {data.map(({ id, ...item }, index) => (
          <TipBox
            name={truncateText(`${index + 1}. ${item.name}`, 45)}
            slug={item.slug}
            key={id}
          />
        ))}
      </div>
    </InnerContainer>
  );
};

export default Tips;
