import { APP_NAME } from '../utils/constants';
import Link from 'next/link';
import { SVETA_EMAIL } from '../utils/constants';
import { useRef } from 'react';

type AuthRightContainerProps = {
  name?: string;
  title?: string;
  subtitle?: string;
  link: { url: string; name: string };
  form?: any;
  footerLinks?: string;
  buttonInfo?: boolean;
};

const AuthRightContainer = ({
  name,
  title,
  subtitle,
  link,
  form,
  buttonInfo,
  footerLinks,
}: AuthRightContainerProps) => {
  return (
    <div className="justify-center order-2 xl-custom:order-1 w-full xl-custom:w-1/2 flex items-start py-16 px-10 xl-custom:px-20 flex-col xl-custom:min-h-screen text-purple">
      <Link href="/">
        <a className="font-logo font-bold text-lg uppercase text-purple-dark">
          {APP_NAME}
        </a>
      </Link>
      <div className="mt-8.5">
        <h2 className="text-3xl font-medium">{title}</h2>
        <p className="mt-2 font-light">
          {subtitle}{' '}
          <Link href={link.url}>
            <a className="text-purple-light">{link.name}</a>
          </Link>
        </p>
      </div>
      <div className="mt-5 w-full">{form}</div>
      {buttonInfo && (
        <div className="text-purple-light text-sm font-light">
          Problém s prihlásením?{' '}
          <Link href={`mailto: ${SVETA_EMAIL}`}>
            <a>Napíšte mi :)</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthRightContainer;
