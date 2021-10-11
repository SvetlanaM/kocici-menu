import Image from '../Image';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

type ProsProp = {
  imageUrl: string;
  title: string;
  description: string;
  imageAlt: string;
};

export default function Pros({
  imageUrl,
  title,
  description,
  imageAlt,
}: ProsProp): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="">
      <Image
        src={imageUrl}
        alt={t(cs[imageAlt])}
        height={100}
        className="mx-auto"
      />
      <p className="font-bold py-6">{t(cs[title])}</p>
      <p>{t(cs[description])}</p>
    </div>
  );
}
