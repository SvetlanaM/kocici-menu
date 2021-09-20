interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
  size: string;
  color?: string;
  hover?: string;
  onClick?: (e?) => void;
}

const SubmitButton = ({
  text,
  disabled,
  size,
  color = 'bg-purple-darkest',
  hover,
  onClick,
}: SubmitButtonProps): JSX.Element => (
  <input
    onClick={onClick}
    type="submit"
    className={`text-white ${color} ${size} float-right mb-5 py-1.5 h-10 cursor-pointer border-rounded-base font-medium text-center transition duration-500 ease-in ${
      disabled ? null : hover
    }`}
    value={text}
    disabled={disabled}
  >
    {''}
  </input>
);

SubmitButton.defaultProps = {
  hover: 'hover:bg-yellow-dark',
};

export default SubmitButton;
