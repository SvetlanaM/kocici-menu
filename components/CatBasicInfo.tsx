import Image from './Image';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import i18next from 'i18next';
import cs from '../public/locales/cs/common.json';
import { useTranslation } from 'next-i18next';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import { useMemo } from 'react';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import truncateText from '../utils/truncateText';
import LoadingImage from './LoadingImage';
import CatForm, { CAT_TYPE_NULL } from './CatForm';
import DateFormatObject from '../utils/getFormatDate';

interface CatBasicInfoProps {
  cat: CatFieldsFragmentFragment;
}
const CatBasicInfo = ({ cat }: CatBasicInfoProps) => {
  i18next.init({
    lng: 'cs',
    debug: false,
    initImmediate: false,
    resources: {
      sk: {
        translation: {
          years: {
            key_0: '{{count}} rok',
            key_1: '{{count}} roky',
            key_2: '{{count}} rokov',
          },
        },
      },
      cs: {
        translation: {
          years: {
            key_0: '{{count}} rok',
            key_1: '{{count}} roky',
            key_2: '{{count}} roků',
          },
        },
      },
    },
  });

  const { t } = useTranslation();

  // FIXME: toto je tu uplne zbytocne teraz
  // const catImage = useMemo<string>(
  //   () => (cat.image_url ? cat.image_url : defaultImage),
  //   [cat.image_url]
  // );

  return (
    <>
      <LoadingImage
        alt={setUppercaseTitle(cat.name)}
        src={cat.image_url}
        width={65}
        height={65}
        placeholder={'/default_cat.svg'}
        className="border-rounded-base object-cover cat-image"
        customStyle="border-rounded-base"
      />
      <div className="flex-col-base justify-between ml-3">
        <h4>{truncateText(cat.name, 12)}</h4>
        <p className="small-light-text">
          {t(cs[cat.type] || cs[CAT_TYPE_NULL])}
        </p>
        <p className="small-light-text text-gray">
          {cat.age
            ? i18next.t('years.key', {
                count: DateFormatObject().getCatAge(cat.year_date),
              })
            : cat.age === 0
            ? t(cs['to_year'])
            : '--'}
        </p>
      </div>
    </>
  );
};

export default CatBasicInfo;
