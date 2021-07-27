import Image from './Image';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import i18next from 'i18next';
import sk from '../public/locales/sk/common.json';
import { useTranslation } from 'next-i18next';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import { useMemo } from 'react';
import { DEFAULT_CAT_IMAGE as defaultImage } from '../utils/constants';
import truncateText from '../utils/truncateText';

interface CatBasicInfoProps {
  cat: CatFieldsFragmentFragment;
}
const CatBasicInfo = ({ cat }: CatBasicInfoProps) => {
  i18next.init({
    lng: 'sk',
    debug: false,
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
    },
  });

  const { t } = useTranslation();

  // FIXME: toto je tu uplne zbytocne teraz
  const catImage = useMemo<string>(
    () => (cat.image_url ? cat.image_url : defaultImage),
    [cat.image_url]
  );

  return (
    <>
      <Image
        alt={setUppercaseTitle(cat.name)}
        src={catImage}
        width={65}
        height={65}
        className="border-rounded-base object-cover cat-image"
      />
      <div className="flex-col-base justify-between ml-3">
        <h4>{truncateText(cat.name, 12)}</h4>
        <p className="small-light-text">
          {t(sk[cat.type] || sk['CAT_TYPE_NULL'])}
        </p>
        <p className="small-light-text text-gray">
          {cat.age
            ? i18next.t('years.key', {
                count: cat.age,
              })
            : '--'}
        </p>
      </div>
    </>
  );
};

export default CatBasicInfo;
