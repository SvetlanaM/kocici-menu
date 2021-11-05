import Image from './Image';
import Loading from './Loading';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface UploadImageProps {
  imageUrl?: string;
  openFileDialog: () => void;
  isLoading: boolean;
  resetPhoto?: () => void;
}

export default function UploadImage({
  imageUrl,
  openFileDialog,
  isLoading,
  resetPhoto,
}: UploadImageProps): JSX.Element {
  const isImageSet = imageUrl && imageUrl.includes('catappreact');
  const { t } = useTranslation();
  return (
    <div className="pt-1 pb-6">
      <div className="mt-1 flex flex-col xl-custom:flex-row items-center">
        <div className="cat-image">
          {isLoading ? (
            <div className="cat-image border-rounded-base justify-center items-center flex">
              <Loading />
            </div>
          ) : (
            <Image
              src={imageUrl}
              className="object-cover flex items-stretch cat-image border-rounded-base"
            />
          )}
        </div>
        <button
          type="button"
          className="lg:w-2/7 mt-5 xl-custom:mt-0 xl-custom:ml-5 bg-white py-2 px-3 border-gray border-rounded-base text-sm text-purple focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray hover:bg-gray-100 transition duration-500 ease-in"
          onClick={openFileDialog}
        >
          {isImageSet ? t(cs['change_photo']) : t(cs['upload_photo'])}
        </button>
        {isImageSet ? (
          <button
            type="button"
            className="mt-5 xl-custom:mt-0 lg:w-2/7 xl-custom:ml-5 bg-red-500 py-2 px-3 border-rounded-base text-sm text-white focus:outline-none focus:bg-red-500
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray hover:bg-red-800 transition duration-500 ease-in"
            onClick={resetPhoto}
          >
            {t(cs['remove_photo'])}
          </button>
        ) : null}
      </div>
    </div>
  );
}
