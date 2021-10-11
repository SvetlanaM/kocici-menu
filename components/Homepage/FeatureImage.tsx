import Image from '../Image';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

type FeatureImageProps = {
  imageUrl: string;
  width: number;
  height?: number;
  extraStyling?: string;
  alt?: string;
};

export default function FeatureImage({
  imageUrl,
  width,
  height,
  extraStyling = 'w-full',
  alt,
}: FeatureImageProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <Image
      src={imageUrl}
      height={height}
      width={width}
      className={extraStyling}
      alt={t(cs[alt])}
    />
  );
}
