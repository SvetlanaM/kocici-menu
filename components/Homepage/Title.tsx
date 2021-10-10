import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

interface TitleProps {
  title: string;
  color: 'text-white' | 'text-purple-darkest';
}

export default function Title({ title, color }: TitleProps): JSX.Element {
  const { t } = useTranslation();
  return <h2 className={`${color} font-lg text-center`}>{t(cs[title])}</h2>;
}
