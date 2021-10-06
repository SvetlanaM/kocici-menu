import Link from 'next/link';
import { APP_NAME, SVETA_EMAIL } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

export default function Menu(): JSX.Element {
  const { t } = useTranslation();
  return (
    <nav className="flex flex-row items-center justify-between">
      <Link href="/">
        <a className="logo font-logo font-bold text-lg uppercase text-purple-dark">
          {APP_NAME}
        </a>
      </Link>
      <div className="flex flex-row justify-between text-purple-darkest">
        <Link href="/user/login">
          <a className="block hover:text-purple-light mx-6">{t(cs['login'])}</a>
        </Link>
        <Link href="/user/register">
          <a className="block hover:text-purple-light mx-6">
            {t(cs['register'])}
          </a>
        </Link>
        <Link href={`mailto:${SVETA_EMAIL}`}>
          <a className="block hover:text-purple-light mx-6 pr-6">
            {t(cs['write_me'])}
          </a>
        </Link>
      </div>
    </nav>
  );
}
