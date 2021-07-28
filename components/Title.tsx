type TitleProps = {
  title: string;
  fontSize?: string;
  classNames?: string;
};

const Title = ({ title, fontSize, classNames }: TitleProps) => (
  <h3 className={`pb-5 ${fontSize} font-semibold text-purple ${classNames}`}>
    {title}
  </h3>
);

Title.defaultProps = {
  fontSize: 'text-lg',
};

export default Title;
