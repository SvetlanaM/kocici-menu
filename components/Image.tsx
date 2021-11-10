type ImageProps = {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  [otherProps: string]: string | number | undefined;
};

export default function Image({
  src,
  width,
  height,
  alt,
  ...otherProps
}: ImageProps): JSX.Element {
  return (
    <img src={src} width={width} height={height} alt={alt} {...otherProps} />
  );
}
