import { gql } from '@apollo/client';
import Title from './Title';
import { TipDetailFragmentFragment } from '../graphql/generated/graphql';
import { TipFieldsFragment } from './TipBox';
import DateFormatObject from '../utils/getFormatDate';
import BackButton from './BackButton';
import Breadcrumbs from './Breadcrumbs';
import Breadcrumb from '../utils/breadcrumb';
import { useEffect, useMemo, useState } from 'react';
import router from 'next/router';
import Image from './Image';
import sk from '../public/locales/sk/common.json';
import { useTranslation } from 'react-i18next';

export const TipDetailFieldsFragment = gql`
  fragment TipDetailFragment on Tip {
    ...TipFieldsFragment
    description
    updated_at
  }
  ${TipFieldsFragment}
`;

const TipDetailBox = ({
  name,
  updated_at,
  description,
  perex,
  category,
}: Omit<TipDetailFragmentFragment, 'created_at'>) => {
  const formattedDate = DateFormatObject(updated_at).formatDate();
  const { t } = useTranslation();
  const breadcrumbs: Breadcrumb[] = useMemo(() => {
    return [
      {
        path: 'back',
        name: 'Späť',
      },
      {
        path: `/tips/${name}`,
        name: name,
      },
    ];
  }, [name, description, updated_at]);

  return (
    <div className="text-justify">
      <Title title={name} />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex justify-between items-center pt-3">
        {category && (
          <div>
            <Image
              src={`/icons/${category.comment}.svg`}
              height={35}
              width={35}
              className="mr-2 xl-custom:inline hidden"
            />{' '}
            <span className="text-sm font-light text-gray">
              {t(sk[category.comment])}
            </span>
          </div>
        )}
        <p className="text-sm font-light text-gray">
          Publikované: {formattedDate}
        </p>
      </div>
      {perex && (
        <div className="text-purple font-normal italic mt-5">{perex}</div>
      )}
      <div
        className="py-5 font-light text-purple leading-normal"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
      <BackButton url={'/'} />
    </div>
  );
};

export default TipDetailBox;
