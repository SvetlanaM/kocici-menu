import { gql } from '@apollo/client';
import Image from './Image';
import { StatFieldsFragmentFragment } from '../graphql/generated/graphql';

export const StatFieldsFragment = gql`
  fragment StatFieldsFragment on brand_fav_type {
    brand_type
  }
`;

type ExtendType = {
  name: StatFieldsFragmentFragment | string;
  title: string;
  icon: string;
};

const StatisticBox = ({ icon, title, name }: ExtendType): JSX.Element => {
  return (
    <div className="flex pt-4 pb-4 pl-5 bg-gray-light border-rounded-base border-gray_lightest">
      <div>
        <Image src={icon} width={80} className="flex stats-img" />
      </div>
      <div className="flex-col-base justify-center ml-6 mr-6 leading-tight">
        <h4 className="mb-1.2 font-semibold text-gray">{title}</h4>
        <p className="small-purple-text">{name}</p>
      </div>
    </div>
  );
};

export default StatisticBox;
