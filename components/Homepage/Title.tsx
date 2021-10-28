import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

interface TitleProps {
  title: string;
  color: 'text-white' | 'text-purple-darkest' | 'text-gray-600';
}

export default function Title({ title, color }: TitleProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <h2
      className={`${color} text-center font-extrabold text-4xl lg:text-5xl leading-none uppercase`}
    >
      {t(cs[title])}
    </h2>
  );
}
