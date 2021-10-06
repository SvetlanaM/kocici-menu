import Image from '../Image';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

type WhySectionWrapperProps = {
  src: string;
  title: string;
  description: string;
};

export default function WhySectionWrapper({
  src,
  title,
  description,
}: WhySectionWrapperProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <section>
      <div className="flex items-center w-10/12">
        <Image src={src} width={67} />
        <h2 className="mx-4 font-bold">{t(cs[title])}</h2>
      </div>
      <p className="pt-5">{t(cs[description])}</p>
    </section>
  );
}
