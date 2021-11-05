import Link from 'next/link';
import { APP_NAME } from '../utils/constants';
import { getUsername } from '../utils/getUsername';
import WelcomeBoxForm from './WelcomeBoxForm';
import UseAuth from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import { useEffect, useState } from 'react';

export default function WelcomeBox(): JSX.Element {
  const { t } = useTranslation();
  const email = UseAuth().user_data && UseAuth().user_data.email;
  const [greeting, setGreeting] = useState(`${t(cs['greeting'])}!`);

  useEffect(() => {
    setGreeting(`${t(cs['greeting'])} ${getUsername(email)}!`);
  }, []);

  return (
    <div className="w-full px-10 pb-10 xl-custom:pb-0">
      <Link href="/">
        <a className="logo font-logo font-bold text-lg uppercase text-purple-dark pt-8 flex">
          {APP_NAME}
        </a>
      </Link>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center justify-center text-left lg:text-center pt-7 xl-custom:pt-0">
          <h2 className="text-3xl font-medium text-purple-darkest">
            {greeting}
          </h2>
          <p className="font-light lg:px-48 pt-6 text-purple-darkest leading-normal">
            {t(cs['welcome_to_app'])}{' '}
            <span className="text-purple-light">{APP_NAME}</span>.{' '}
            {t(cs['first_step'])}{' '}
            <span className="font-bold">{t(cs['1_or_more'])}</span>.
          </p>
          <div className="pt-8 w-full lg:w-3/5">
            <WelcomeBoxForm />
          </div>
          <Link href="/my-cats">
            <p className="text-gray font-light cursor-pointer hover:text-purple-darkest">
              {t(cs['skip'])}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
