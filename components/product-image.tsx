import Image from 'next/image';

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
      priority
    />
  );
};

export default ProductImage;
