import Image from '../components/Image';
import Link from 'next/link';
import { APP_NAME } from '../utils/constants';
import Header from '../components/Head';
import getTitle from '../utils/getTitle';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

export default function Custom404(): JSX.Element {
  const { t } = useTranslation();
  return (
    <>
      <Header title={getTitle(t(cs['404']))} />
      <div className="flex flex-col xl-custom:flex-row w-full justify-center h-screen items-center my-2">
        <div className="xl-custom:w-1/2 flex items-center px-10 xl-custom:px-20 flex-col text-purple">
          <Link href="/">
            <a className="font-logo font-bold text-lg uppercase text-purple-dark">
              {APP_NAME}
            </a>
          </Link>
          <h1 className="text-center font-bold text-lg py-3">
            {t(cs['404_error'])}
          </h1>
          <div className="py-5">
            <Image src="/icons/404.png" height={70} width={400} />
          </div>
          <Link href="/dashboard">
            <a className="font-bold text-purple-light hover:text-purple">
              {t(cs['back_to_dashboard'])}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
