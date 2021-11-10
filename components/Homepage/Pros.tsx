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
        width={'auto'}
        className="mx-auto"
      />
      <p className="font-bold text-lg py-6">{t(cs[title])}</p>
      <p className="text-left text-md">{t(cs[description])}</p>
    </div>
  );
}
