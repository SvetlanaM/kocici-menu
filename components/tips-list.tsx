import Title from './title';
import TipBox from './tip-box';
import InnerContainer from './inner-container';
import { GetDashboardQuery } from '../graphql/generated/graphql';
import truncateText from '../utils/truncate-text';
interface TipProps {
  data: GetDashboardQuery['tips'];
  cols: string;
}
const TipsList = ({ data, cols }: TipProps) => {
  return (
    <InnerContainer flexType="flex-col">
      <Title title="Tipy a odporúčania" />
      <div className={`grid ${cols} grid-flow-row gap-x-11`}>
        {data.map(({ id, ...item }, index) => (
          <TipBox
            name={truncateText(`${index + 1}. ${item.name}`, 45)}
            slug={item.slug}
            id={id}
            key={id}
          />
        ))}
      </div>
    </InnerContainer>
  );
};

export default TipsList;
