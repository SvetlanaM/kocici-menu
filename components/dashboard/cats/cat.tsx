import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';

export const fragments = gql`
  fragment CatSectionFragment on cat {
    age
    id
    name
    type
  }
`;

const CatSection = ({ cat: { name, type, age, photo } }) => {
  return (
    <div className="flex justify-between h-75 py-3 px-3 border-rounded-base border-gray small-purple-text text-left my-cat">
      <div className="flex">
        <Image
          src="/stacy.png"
          alt={name}
          height={65}
          width={65}
          quality={100}
        />
        <div className="flex-col-base justify-between ml-3">
          <h4>{name}</h4>
          <p className="small-light-text">{type}</p>
          <p className="small-light-text text-gray">{age} roky</p>
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
