import Title from './Title';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

const CatDetailSpecials = (data) => {
  const { t } = useTranslation();
  return (
    <div className="mt-5">
      <Title title={t(sk['special_requirements'])} />
      <ul className="small-purple-text">
        <li className="border-b-2 border-gray py-3">tucko</li>
        <li className="border-b-2 border-gray py-3">tucko</li>
      </ul>
    </div>
  );
};

export default CatDetailSpecials;
