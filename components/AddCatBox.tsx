import Link from 'next/link';

const AddCatBox = () => {
  return (
    <div className="relative">
      <div className="flex pt-6 pb-6 xxl-custom:pt-9 xxl-custom:pb-9 pl-4 border-rounded-base border-yellow bg-yellow-light add-cat">
        <Link href="/my-cats/new-cat">
          <a className="w-4/6 text-normal leading-tight font-semibold text-yellow-dark break-words">
            Pridať novú mačku
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AddCatBox;
