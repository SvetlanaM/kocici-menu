import Image from '../components/image';
import Link from 'next/link';

interface TopTipsListProps {
  data: Array<any>;
  cols: string;
}

const TopTipsList = ({ data, cols }: TopTipsListProps) => {
  return (
    <div className={`grid ${cols} gap-x-11`}>
      {data &&
        data.map((item) => (
          <Link href={`/tips/${encodeURIComponent(item.slug)}`}>
            <a>
              <div className="flex pt-4 pr-10 bg-gray-light border-rounded-base border-gray_lightest">
                <div className="mb-0 w-1/2 h-40 overflow-hidden flex items-end justify-center ml-5">
                  <Image src={item.icon} className="mt-auto mr-auto" />
                </div>
                <div className="flex-col-base justify-evenly mb-5 mt-3 ml-6 leading-tight">
                  <h4 className="mb-3 text-purple font-medium text-1xl">
                    {item.title}
                  </h4>
                  <p className="small-purple-text font-light text-sm">
                    {item.name}
                    <span className="text-purple-light block mt-3">
                      {item.category}
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default TopTipsList;
