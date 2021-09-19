import setUppercaseTitle from '../../utils/setUppercaseTitle';
import i18next from 'i18next';
import cs from '../../public/locales/cs/common.json';
import { useTranslation } from 'next-i18next';
import { CatFieldsFragmentFragment } from '../../graphql/generated/graphql';
import truncateText from '../../utils/truncateText';
import LoadingImage from '../LoadingImage';
import { CAT_TYPE_NULL } from '../../utils/constants';
import DateFormatObject from '../../utils/getFormatDate';

interface CatBasicInfoProps {
  cat: CatFieldsFragmentFragment;
}
const CatBasicInfo = ({ cat }: CatBasicInfoProps): JSX.Element => {
  const { t } = useTranslation();

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
