import Link from 'next/link';

interface Props {
  url: string;
}

const BackButton = (props: Props): JSX.Element => (
  <Link href={props.url}>
    <a>
      <button className="mb-5 py-1.5 border-rounded-base border-purple font-medium text-center text-purple-light transition duration-500 ease-in hover:bg-purple-light hover:text-white w-1/4">
        {'Späť'}
      </button>
    </a>
  </Link>
);

export default BackButton;
