import Link from 'next/link';

interface Props {
  text: string;
}

const SubmitButton = (props: Props): JSX.Element => (
  <button className="text-white bg-purple-darkest float-right mb-5 py-1.5 w-1/4 mt-5 border-rounded-base font-medium text-center transition duration-500 ease-in hover:bg-yellow-dark">
    {props.text}
  </button>
);

export default SubmitButton;
