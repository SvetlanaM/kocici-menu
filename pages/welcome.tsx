import Layout from '../components/Layout';
import Header from '../components/Head';
import getTitle from '../utils/getTitle';
import WelcomeBox from '../components/WelcomeBox';
import Link from 'next/link';
import { APP_NAME } from '../utils/constants';

export default function Welcome() {
  return (
    <>
      <Header title={getTitle('Vitajte')} />

      <WelcomeBox />
    </>
  );
}
