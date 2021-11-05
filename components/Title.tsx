type TitleProps = {
  title: string;
  fontSize?: string;
  paddingBottom?: string;
  classNames?: string;
};

const Title = ({
  title,
  fontSize,
  classNames,
  paddingBottom,
}: TitleProps): JSX.Element => (
  <h3
    className={`${fontSize} ${paddingBottom} font-semibold text-purple text-left ${classNames}`}
  >
    {title}
  </h3>
);

Title.defaultProps = {
  fontSize: 'text-lg',
  paddingBottom: 'xl-custom:pb-5 pb-3',
};

export default Title;
