import { useMemo } from 'react';
import Image from '../components/image';
import { DEFAULT_PRODUCT_IMAGE as defaultImage } from '../utils/constants';

interface ProductImageProps {
  src: string;
  alt: string;
  [otherProps: string]: any;
}

const ProductImage = ({ src, alt, ...otherProps }: ProductImageProps) => {
  const productImage = useMemo<string>(() => (src ? src : defaultImage), [src]);
  return (
    <Image
      src={productImage}
      alt={alt}
      width={55}
      height={55}
      quality={100}
      {...otherProps}
    />
  );
};

export default ProductImage;
