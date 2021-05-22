import Link from 'next/link';

interface Props {
  text: string;
  disabled?: boolean;
  size: string;
  color: string;
  onClick?: () => void;
}
const hover = 'hover:bg-yellow-dark';
const SubmitButton = (props: Props): JSX.Element => (
  <button
    onClick={props.onClick}
    className={`text-white ${props.color} ${
      props.size
    } float-right mb-5 py-1.5 mt-5 border-rounded-base font-medium text-center transition duration-500 ease-in ${
      props.disabled ? null : hover
    }`}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

SubmitButton.defaultProps = {
  color: 'bg-purple-darkest',
};

export default SubmitButton;
