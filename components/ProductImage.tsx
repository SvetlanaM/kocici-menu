import { useMemo } from 'react';
import Image from './Image';
import { DEFAULT_PRODUCT_IMAGE as defaultImage } from '../utils/constants';

interface ProductImageProps {
  src: string;
  alt: string;
  type?: string;
}

const ProductImage = ({ src, alt, type }: ProductImageProps): JSX.Element => {
  const productImage = useMemo<string>(() => {
    if (src) {
      return src;
    } else {
      return defaultImage;
    }
  }, [src]);

  return (
    <Image
      alt={alt}
      src={productImage}
      width={55}
      height={55}
      placeholder={productImage}
      quality={100}
      className={
        type !== 'search' ? 'ml-3.5' : 'object-fill h-10 w-10 mr-4 float-right'
      }
      type={type}
    />
  );
};

export default ProductImage;
