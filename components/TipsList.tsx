import Title from './Title';
import TipBox from './TipBox';
import InnerContainer from './InnerContainer';
import { GetDashboardQuery, GetTipsQuery } from '../graphql/generated/graphql';
import truncateText from '../utils/truncateText';
import FormInput from './FormInput';
import { useState } from 'react';
import useSearch from '../hooks/useSearch';
import Image from './Image';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

interface TipProps {
  data: GetDashboardQuery['tips'] | GetTipsQuery['tips'];
  cols: string;
  isOnDashboard: boolean;
}

const calculateReadingTime = (readingText: string): number => {
  const avgReadingTime = 250;
  const words = readingText.trim().split(/\s+/).length;
  return Math.ceil(words / avgReadingTime);
};

const TipsList = ({ data, cols, isOnDashboard }: TipProps): JSX.Element => {
  const { t } = useTranslation();
  const copyData = [...data];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTips, setSearchTips] = useState<
    GetDashboardQuery['tips'] | GetTipsQuery['tips']
  >(copyData);
  useSearch(searchTerm, data, setSearchTips, false);

  return (
    <InnerContainer flexType="flex-col">
      <div className="flex flex-col xl-custom:flex-row justify-between mb-2 xl-custom:items-center">
        <Title title={t(cs['tips_and_recommendations'])} />
        {!isOnDashboard && (
          <div className="flex flex-row justify-end w-full xl-custom:w-1/2 float-right relative">
            <FormInput
              type="text"
              name="search"
              placeholder={t(cs['search_from_characters'])}
              width={'w-full xl-custom:w-1/2'}
              allowOnChange={true}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              defaultValue={searchTerm}
            />
            {searchTerm !== '' && (
              <a onClick={() => setSearchTerm('')} className="cursor-pointer">
                <Image
                  src={'/icons/cancel.svg'}
                  width={12}
                  className="filter-cancel"
                />
              </a>
            )}
          </div>
        )}
      </div>
      <div
        className={`grid xl-custom:${cols} grid-flow-row gap-x-11 ${
          !isOnDashboard ? 'section-tip' : null
        }`}
      >
        {searchTips.map(({ id, ...item }, index) => (
          <TipBox
            order={`${index + 1}. `}
            name={truncateText(`${item.name}`, 40)}
            slug={item.slug}
            key={id}
            isOnDashboard={isOnDashboard}
            category_machine_name={item.category.comment}
            readingTime={calculateReadingTime(item.description)}
          />
        ))}
      </div>
    </InnerContainer>
  );
};

export default TipsList;
