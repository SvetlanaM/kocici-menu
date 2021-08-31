import { useCallback, useEffect, useState } from 'react';
import Loading from './Loading';

type LoadingImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  placeholder?: string;
  customStyle?: string;
  [otherProps: string]: string | number | undefined;
};

export default function LoadingImage({
  src,
  width,
  height,
  alt,
  placeholder,
  customStyle,
  ...otherProps
}: LoadingImageProps): JSX.Element {
  enum Status {
    loading,
    finished,
    error,
  }

  let [imageStatus, setImageStatus] = useState(Status.loading);

  let sourceURL = src ?? placeholder;

  useEffect(() => {
    setImageStatus(Status.loading);
  }, [sourceURL]);

  const handleOnLoad = useCallback(() => {
    if (imageStatus === Status.loading) setImageStatus(Status.finished);
  }, []);

  const handleOnError = useCallback(() => {
    setImageStatus(Status.error);
  }, []);

  return (
    <>
      <div
        className={`cat-image justify-center items-center flex ${customStyle}`}
        style={
          imageStatus !== Status.loading
            ? { display: 'none' }
            : otherProps.style
        }
      >
        <Loading />
      </div>
      <img
        onLoad={handleOnLoad}
        onError={handleOnError}
        src={imageStatus === Status.error ? placeholder : sourceURL}
        width={width}
        height={height}
        alt={alt}
        style={
          imageStatus === Status.loading
            ? { display: 'none' }
            : otherProps.style
        }
        {...otherProps}
      />
    </>
  );
}
