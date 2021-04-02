type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h3 className="pb-3.6 text-lg font-semibold text-purple">{title}</h3>;
};

export default Title;
