import Link from 'next/link';
import router from 'next/router';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

interface Props {
  url?: string;
}

const goBack = (e) => {
  e.preventDefault();
  router.back();
};

const BackButton = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  return (
    <button
      className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white w-full xl-custom:w-1/4"
      onClick={(e) => goBack(e)}
      type="button"
    >
      {t(sk['back'])}
    </button>
  );
};

export default BackButton;
