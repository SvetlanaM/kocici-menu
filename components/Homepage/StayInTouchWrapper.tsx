import Title from './Title';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import Image from '../Image';

export default function StayInTouchWrapper(): JSX.Element {
  const { t } = useTranslation();
  return (
    <section className="mt-24 flex items-center bg-gray-light py-20">
      <div className="px-10">
        <Title title="stay_in_touch" color="text-gray-600" />
        <input></input>
        <p>{t(cs['a'])}</p>
        <Image src="ahoj" width={300} />
      </div>
    </section>
  );
}
