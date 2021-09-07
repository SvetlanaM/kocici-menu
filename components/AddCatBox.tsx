import Link from 'next/link';
import { BackLinkType } from '../utils/backlinks';

const AddCatBox = ({ backlink }: { backlink: BackLinkType }) => {
  return (
    <Link
      href={{
        pathname: '/my-cats/new-cat',
        query: { backlink: backlink },
      }}
    >
      <a>
        <div className="relative">
          <div className="flex pt-6 pb-6 xxl-custom:pt-9 xxl-custom:pb-9 pl-4 border-rounded-base border-yellow bg-yellow-light add-cat hover:bg-yellow-lightest">
            <span className="w-4/6 text-normal leading-tight font-semibold text-yellow-dark break-words">
              Pridať novú mačku
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default AddCatBox;
