import Title from './title';
import TipSection from './tip-box';
import InnerContainer from './inner-container';
import { GetDashboardQuery } from '../graphql/generated/graphql';

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
          <TipSection name={`${index + 1}. ${item.name}`} id={id} key={id} />
        ))}
      </div>
    </InnerContainer>
  );
};

export default TipsList;
