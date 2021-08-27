import Link from 'next/link';
import { APP_NAME } from '../utils/constants';
import { getUsername } from '../utils/getUsername';
import WelcomeBoxForm from './WelcomeBoxForm';
import UseAuth from '../hooks/useAuth';

export default function WelcomeBox() {
  const email = UseAuth().user_data && UseAuth().user_data.email;

  return (
    <div className="w-full px-10 min-h-screen">
      <Link href="/">
        <a className="font-logo font-bold text-lg uppercase text-purple-dark pt-8 flex">
          {APP_NAME}
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center text-center min-h-auto pt-10">
        <h2 className="text-3xl font-medium text-purple-darkest">
          Čauky mňauky, {getUsername(email)}!
        </h2>
        <p className="font-light px-48 pt-6 text-purple-darkest leading-normal">
          Vitaj v aplikácii{' '}
          <span className="text-purple-light">{APP_NAME}</span>. V prvom kroku,
          by sme chceli vedieť, čo tvoje mačky obľubujú a čím ich primárne
          kŕmiš:) Je možné označiť{' '}
          <span className="font-bold">1 a viacero možností naraz</span>.
        </p>
        <div className="pt-8 w-3/5">
          <WelcomeBoxForm />
        </div>
        <p className="text-gray font-light">Preskočiť</p>
      </div>
    </div>
  );
}
