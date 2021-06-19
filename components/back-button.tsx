import Link from 'next/link';
import router from 'next/router';

interface Props {
  url?: string;
}

const BackButton = (props: Props): JSX.Element => (
  <button
    className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white w-1/4"
    onClick={() => router.back()}
  >
    {'Späť'}
  </button>
);

export default BackButton;
