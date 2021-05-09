import Link from 'next/link';

interface Props {
  text: string;
  disabled: boolean;
  size: string;
}
const hover = 'hover:bg-yellow-dark';
const SubmitButton = (props: Props): JSX.Element => (
  <button
    className={`text-white bg-purple-darkest ${
      props.size
    } float-right mb-5 py-1.5 mt-5 border-rounded-base font-medium text-center transition duration-500 ease-in ${
      props.disabled ? null : hover
    }`}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

export default SubmitButton;
