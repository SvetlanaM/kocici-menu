import { useCallback, useEffect, useState } from 'react';
import Loading from './Loading';
import React from 'react';

type LoadingImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  placeholder?: string;
  type?: string;
  customStyle?: string;
  [otherProps: string]: string | number | undefined;
};

export default React.memo(function LoadingImage({
  src,
  width,
  height,
  alt,
  placeholder,
  type,
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

  // useEffect(() => {
  //   setImageStatus(Status.loading);
  // }, [sourceURL]);

  const handleOnLoad = useCallback(() => {
    if (imageStatus === Status.loading) setImageStatus(Status.finished);
  }, []);

  const handleOnError = useCallback(() => {
    setImageStatus(Status.error);
  }, []);

  const { className, ...restProps } = otherProps

  return (
    <>
      <div
        className={
          type !== 'search'
            ? `cat-image justify-center items-center flex ${customStyle} ${imageStatus !== Status.loading ? "hidden" : ""}`
            : `object-fill h-10 w-10 mr-4 float-right ${imageStatus !== Status.loading ? "hidden" : ""}`
        }
      >
        {type !== 'product' ? <Loading /> : null}
      </div>
      <img
        onLoad={handleOnLoad}
        onError={handleOnError}
        src={imageStatus === Status.error ? placeholder : sourceURL}
        width={width}
        height={height}
        alt={alt}
        className={`${className} ${imageStatus === Status.loading ? "hidden" : ""}`}
        {...restProps}
      />
    </>
  );
});
