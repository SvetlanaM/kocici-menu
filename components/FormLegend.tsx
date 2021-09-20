interface FormLegendProps {
  name: string;
}

const FormLegend = ({ name }: FormLegendProps): JSX.Element => {
  return <legend className="pb-4 font-semibold text-purple">{name}</legend>;
};

export default FormLegend;
