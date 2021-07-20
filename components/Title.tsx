type TitleProps = {
  title: string;
  fontSize?: string;
};

const Title = ({ title, fontSize }: TitleProps) => (
  <h3 className={`pb-5 ${fontSize} font-semibold text-purple`}>{title}</h3>
);

Title.defaultProps = {
  fontSize: 'text-lg',
};

export default Title;
