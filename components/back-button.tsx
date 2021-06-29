import Link from 'next/link';
import router from 'next/router';

interface Props {
  url?: string;
}

const goBack = (e) => {
  e.preventDefault();
  router.back();
};

const BackButton = (props: Props): JSX.Element => (
  <button
    className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white w-full xl-custom:w-1/4"
    onClick={(e) => goBack(e)}
  >
    {'Späť'}
  </button>
);

export default BackButton;
