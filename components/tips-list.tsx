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
        {data.map((item, index) => (
          <TipSection
            name={`${index + 1}. ${item.name}`}
            id={item.id}
            key={item.id}
          />
        ))}
      </div>
    </InnerContainer>
  );
};

export default TipsList;
