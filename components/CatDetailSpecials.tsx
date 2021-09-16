import Title from './Title';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

const CatDetailSpecials = (data) => {
  const { t } = useTranslation();
  return (
    <div className="mt-5">
      <Title title={t(cs['special_requirements'])} />
      <ul className="small-purple-text">
        <li className="border-b-2 border-gray py-3">tucko</li>
        <li className="border-b-2 border-gray py-3">tucko</li>
      </ul>
    </div>
  );
};

export default CatDetailSpecials;
