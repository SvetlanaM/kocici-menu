import { gql } from '@apollo/client';
import Image from 'next/image';
import {
  GetDashboardQuery,
  StatFieldsFragmentFragment,
} from '../graphql/generated/graphql';

export const StatFieldsFragment = gql`
  fragment StatFieldsFragment on brand_fav_type {
    brand_type
  }
`;

type Extend = {
  name: StatFieldsFragmentFragment;
} & {
  title: string;
  icon: string;
};

const StatisticBox = ({ icon, title, name }) => {
  return (
    <div className="flex pt-4 pb-4 pl-5 bg-gray-light border-rounded-base border-gray_lightest">
      <div>
        <Image src={icon} height={75} width={80} />
      </div>
      <div className="flex-col-base justify-center ml-6 leading-tight">
        <h4 className="mb-1.2 font-semibold text-gray">{title}</h4>
        <p className="small-purple-text">{name}</p>
      </div>
    </div>
  );
};

export default StatisticBox;
