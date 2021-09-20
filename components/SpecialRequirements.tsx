interface SpecialRequirementsProps {
  name: string;
}

const SpecialRequirements = ({
  name,
}: SpecialRequirementsProps): JSX.Element => {
  return <div>{name}</div>;
};

export default SpecialRequirements;
