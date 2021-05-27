import Link from 'next/link';

interface Props {
  text: string;
  disabled?: boolean;
  size: string;
  color: string;
  hover?: string;
  onClick?: () => void;
}

const SubmitButton = (props: Props): JSX.Element => (
  <button
    onClick={props.onClick}
    className={`text-white ${props.color} ${
      props.size
    } float-right mb-5 py-1.5 h-10 border-rounded-base font-medium text-center transition duration-500 ease-in ${
      props.disabled ? null : props.hover
    }`}
    disabled={props.disabled}
  >
    {props.text}
  </button>
);

SubmitButton.defaultProps = {
  color: 'bg-purple-darkest',
  hover: 'hover:bg-yellow-dark',
};

export default SubmitButton;
