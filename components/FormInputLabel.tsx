interface FormInputLabelProps {
  name: string;
}

const FormInputLabel = ({ name }: FormInputLabelProps): JSX.Element => (
  <label className="mb-1">
    <span className="base-medium-text font-light text-purple mb-1">{name}</span>
  </label>
);

export default FormInputLabel;
