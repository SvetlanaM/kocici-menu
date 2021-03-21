import Image from 'next/image';
import Link from 'next/link';

const CatSection = ({ name, type, age, photo }) => {
  return (
    <div className="h-75 flex justify-between border rounded-1.2xl border-gray text-left text-purple text-sm py-3 px-3 my-cat">
      <div className="flex">
        <Image
          src="/stacy.png"
          alt={name}
          height={65}
          width={65}
          quality={100}
        />
        <div className="ml-3 flex flex-col justify-between">
          <h4>Stacey {name}</h4>
          <p className="font-light text-xs">domáca {type}</p>
          <p className="font-light text-xs text-gray">2{age} roky</p>
        </div>
      </div>
      <Link href="/">
        <a className="flex">
          <Image
            src="/icons/down.svg"
            alt={name}
            height={8}
            width={15}
            quality={100}
          />
        </a>
      </Link>
    </div>
  );
};

export default CatSection;
