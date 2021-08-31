import { useEffect, useMemo, useState } from 'react';
import Image from './Image';
import { DEFAULT_PRODUCT_IMAGE as defaultImage } from '../utils/constants';
import LoadingImage from './LoadingImage';
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
    <LoadingImage
      alt={alt}
      src={productImage}
      width={55}
      height={55}
      placeholder={productImage}
      quality={100}
      className="ml-3.5"
    />
  );
};

export default ProductImage;
