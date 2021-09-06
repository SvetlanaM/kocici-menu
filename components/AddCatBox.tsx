import Link from 'next/link';
import { BackLinkType } from "../utils/backlinks";

const AddCatBox = ({ backlink, onNewCat } : { backlink: BackLinkType, onNewCat?: () => void }) => {
  return (
    <div className="relative">
      <div className="flex pt-6 pb-6 xxl-custom:pt-9 xxl-custom:pb-9 pl-4 border-rounded-base border-yellow bg-yellow-light add-cat">
        <Link href={{
                    pathname: "/my-cats/new-cat",
                    query: { backlink: backlink }
                }}
              //as={"/my-cats/new-cat"}
        >
          <a className="w-4/6 text-normal leading-tight font-semibold text-yellow-dark break-words" onClick={onNewCat}>
            Pridať novú mačku
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AddCatBox;
