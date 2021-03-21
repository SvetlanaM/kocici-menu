import Link from 'next/link';

const AddCat = () => {
  return (
    <div className="relative">
      <div className="bg-yellow-light py-1.5 border rounded-1.2xl border-yellow flex pt-6 pb-6 pl-4 add-cat">
        <Link href="/">
          <a className="text-yellow-dark font-semibold text-normal break-words w-4/6 leading-tight">
            Pridať novú mačku
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AddCat;
