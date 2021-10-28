import Link from 'next/link';
import { APP_NAME, SVETA_EMAIL } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

export default function Menu(): JSX.Element {
  const { t } = useTranslation();
  return (
    <nav className="flex flex-col lg:flex-row items-center justify-between">
      <Link href="/">
        <a className="logo font-logo font-bold text-lg uppercase text-purple-dark">
          {APP_NAME}
        </a>
      </Link>
      <div className="mt-5 lg:mt-0 flex flex-row justify-between w-full lg:w-auto text-purple-darkest">
        <Link href="/user/login">
          <a className="block hover:text-purple-light lg:mx-6">
            {t(cs['login'])}
          </a>
        </Link>
        <Link href="/user/register">
          <a className="block hover:text-purple-light mx-3 lg:mx-6">
            {t(cs['register'])}
          </a>
        </Link>
        <Link href={`mailto:${SVETA_EMAIL}`}>
          <a className="block hover:text-purple-light mx-3 lg:mx-6 pr-3 lg:pr-6 hidden lg:block">
            {t(cs['write_me'])}
          </a>
        </Link>
      </div>
    </nav>
  );
}
