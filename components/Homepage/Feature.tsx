import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

type FeatureProps = {
  title: string;
  description?: string;
  width?: string;
  flexType?: 'flex-col' | 'flex-row';
};

export default function Feature({
  title,
  description,
  width = 'w-full lg:w-2/3',
  flexType = 'flex-col',
}: FeatureProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <section className={`flex justify-center ${flexType}`}>
      <h3 className={`text-purple-light text-2xl font-bold ${width} mb-5`}>
        {t(cs[title])}
      </h3>
      {description && (
        <div className="text-purple-darkest text-md font-light leading-normal w-full lg:w-5/6">
          {t(cs[description])}
        </div>
      )}
    </section>
  );
}
