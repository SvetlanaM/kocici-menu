import Link from 'next/link';

interface Props {
  text: string;
  disabled?: boolean;
  size: string;
  color: string;
  hover?: string;
  onClick?: (e?) => void;
}

const SubmitButton = (props: Props): JSX.Element => (
  <input
    onClick={props.onClick}
    type="submit"
    className={`text-white ${props.color} ${
      props.size
    } float-right mb-5 py-1.5 h-10 cursor-pointer border-rounded-base font-medium text-center transition duration-500 ease-in ${
      props.disabled ? null : props.hover
    }`}
    value={props.text}
    disabled={props.disabled}
  ></input>
);

SubmitButton.defaultProps = {
  color: 'bg-purple-darkest',
  hover: 'hover:bg-yellow-dark',
};

export default SubmitButton;
