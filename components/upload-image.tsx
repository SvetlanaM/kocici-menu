import Image from '../components/image';
import Loading from '../components/loading';

interface UploadImageProps {
  imageUrl?: string;
  openFileDialog: () => void;
  isLoading: boolean;
}

export default function UploadImage({
  imageUrl,
  openFileDialog,
  isLoading,
}: UploadImageProps) {
  return (
    <div className="pt-1 pb-6">
      <div className="mt-1 flex items-center">
        <div className="cat-image flex justify-center items-center border-rounded-base">
          {isLoading ? (
            <Loading />
          ) : (
            <Image
              src={imageUrl}
              className="object-cover flex items-stretch cat-image"
            />
          )}
        </div>
        <button
          type="button"
          className="ml-5 bg-white py-2 px-3 border-gray border-rounded-base text-sm text-purple focus:outline-none focus:bg-white focus:border-gray
              focus:border focus:ring-gray focus:ring-opacity-50 placeholder-gray hover:bg-gray-100 transition duration-500 ease-in"
          onClick={openFileDialog}
        >
          Nahrať fotku
        </button>
      </div>
    </div>
  );
}
