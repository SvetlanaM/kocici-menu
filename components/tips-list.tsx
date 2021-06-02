import Title from './title';
import TipBox from './tip-box';
import InnerContainer from './inner-container';
import { GetDashboardQuery, GetTipsQuery } from '../graphql/generated/graphql';
import truncateText from '../utils/truncate-text';
import FormInput from './form-input';
import { useEffect, useState } from 'react';
import useSearch from '../hooks/useSearch';
interface TipProps {
  data: GetDashboardQuery['tips'] | GetTipsQuery['tips'];
  cols: string;
  isOnDashboard: boolean;
}

const calculateReadingTime = (readingText: string): number => {
  const avgReadingTime = 250;
  const words = readingText.trim().split(/\s+/).length;
  const time = Math.ceil(words / avgReadingTime);
  return time;
};

const TipsList = ({ data, cols, isOnDashboard }: TipProps) => {
  const copyData = [...data];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTips, setSearchTips] =
    useState<GetDashboardQuery['tips'] | GetTipsQuery['tips']>(copyData);

  useSearch(searchTerm, data, setSearchTips, false);

  console.log(searchTips);
  return (
    <InnerContainer flexType="flex-col">
      <div className="flex flex-row justify-between mb-2 items-center">
        <Title title="Tipy a odporúčania" />
        {!isOnDashboard && (
          <FormInput
            type="text"
            placeholder="Vyhľadať článok od 3 znakov"
            width={'w-1/3'}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}
      </div>
      <div className={`grid ${cols} grid-flow-row gap-x-11`}>
        {searchTips.map(({ id, ...item }, index) => (
          <TipBox
            order={`${index + 1}. `}
            name={truncateText(`${item.name}`, 45)}
            slug={item.slug}
            key={id}
            isOnDashboard={isOnDashboard}
            category_machine_name={item.category_machine_name}
            readingTime={calculateReadingTime(item.description)}
          />
        ))}
      </div>
    </InnerContainer>
  );
};

export default TipsList;
