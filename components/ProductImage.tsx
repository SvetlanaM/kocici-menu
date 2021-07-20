import { useEffect, useMemo, useState } from 'react';
import Image from './Image';
import { DEFAULT_PRODUCT_IMAGE as defaultImage } from '../utils/constants';

interface ProductImageProps {
  src: string;
  alt: string;
  [otherProps: string]: any;
}

const ProductImage = ({ src, alt, ...otherProps }: ProductImageProps) => {
  const [urlError, setUrlError] = useState<boolean>(true);

  const onError = () => {
    setUrlError(false);
  };

  const productImage = useMemo<string>(() => {
    if (urlError) {
      return src;
    } else {
      return defaultImage;
    }
  }, [urlError, src]);

  return (
    <Image
      src={productImage}
      alt={alt}
      width={55}
      height={55}
      quality={100}
      {...otherProps}
      onError={onError}
    />
  );
};

export default ProductImage;
