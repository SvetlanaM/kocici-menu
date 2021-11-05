import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import { CURRENT_YEAR } from '../../utils/constants';

export default function Footer(): JSX.Element {
  const { t } = useTranslation();
  return (
    <footer className="container-width">
      <div className="lg:container lg:mx-auto px-5 custom-lg:px-0">
        <div className="mt-10 lg:mt-24 border-t-1 border-gray-light flex flex-col lg:flex-row items-baseline justify-between text-purple-darkest">
          <div className="w-full lg:w-1/2 py-6">
            <ul className="flex flex-col lg:flex-row lg:inline-flex">
              <li className="pr-6">
                <Link href="/terms-and-conditions">
                  <a className="target_new hover:text-purple-light">
                    {t(cs['toc_footer'])}
                  </a>
                </Link>
              </li>
              <li className="pr-6">
                <Link href="/privacy">
                  <a className="target_new hover:text-purple-light">
                    {t(cs['privacy'])}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/user/login">
                  <a className="target_new hover:text-purple-light">
                    {t(cs['login'])}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-5 lg:py-6 text-purple-darkest">
            <p className="font-bold">
              © {CURRENT_YEAR}{' '}
              <Link href="https://kompilator.cz/">
                <a className="target_new hover:text-purple-light">Kompilátor</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
