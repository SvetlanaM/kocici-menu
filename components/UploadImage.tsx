import Image from './Image';
import Loading from './Loading';

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
}: UploadImageProps) {
  const isImageSet = imageUrl && imageUrl.includes('catappreact');

  return (
    <div className="pt-1 pb-6">
      <div className="mt-1 flex items-center">
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
          className="ml-5 bg-white py-2 px-3 border-gray border-rounded-base text-sm text-purple focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray hover:bg-gray-100 transition duration-500 ease-in"
          onClick={openFileDialog}
        >
          {isImageSet ? 'Zmeniť fotku' : 'Nahrať fotku'}
        </button>
        {isImageSet ? (
          <button
            type="button"
            className="ml-5 bg-red-500 py-2 px-3 border-rounded-base text-sm text-white focus:outline-none focus:bg-red-500
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray hover:bg-red-800 transition duration-500 ease-in"
            onClick={resetPhoto}
          >
            Vymazať fotku
          </button>
        ) : null}
      </div>
    </div>
  );
}
