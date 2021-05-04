import Image from '../components/image';

interface ProductImageProps {
  src: string;
  alt: string;
  [otherProps: string]: any;
}

const ProductImage = ({ src, alt, ...otherProps }: ProductImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={55}
      height={55}
      quality={100}
      {...otherProps}
    />
  );
};

export default ProductImage;
