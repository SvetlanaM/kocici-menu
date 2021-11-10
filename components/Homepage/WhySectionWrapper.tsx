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
      <div className="flex flex-col lg:flex-row items-center w-full lg:w-10/12">
        <Image src={src} width={67} height={67} />
        <h2 className="lg:mx-4 text-center lg:text-left mt-5 lg:mt-0 font-bold">
          {t(cs[title])}
        </h2>
      </div>
      <p className="w-full lg:w-11/12 pt-5">{t(cs[description])}</p>
    </section>
  );
}
