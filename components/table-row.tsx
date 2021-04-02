import Image from 'next/image';
import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { ProductFieldsFragmentFragment } from '../graphql/generated/graphql';

export const ProductFieldsFragment = gql`
  fragment ProductFieldsFragment on Product {
    id
    name
    image_url
    price
    brand {
      name
    }
    review
    review_updated_date
  }
`;

const TableRow = ({
  name,
  image_url,
  price,
  brand,
  review,
  review_updated_date,
}: ProductFieldsFragmentFragment) => {
  const [actualReview, setReview] = useState<number>(Number(review));
  const addMore = () => setReview((prev) => prev + 1);
  const addLess = () => setReview((prev) => prev - 1);
  const onLastValue = actualReview === 10;
  const onFirstValue = actualReview === 1;

  return (
    <tr>
      <td className="pl-3.6 py-4">
        <Image
          src={image_url}
          alt={`${brand.name} - ${name}`}
          width={55}
          height={55}
          quality={100}
        />
      </td>
      <td>
        <span className="base-medium-text">{brand.name}</span>
        <br />
        {name}
      </td>
      <td>{review_updated_date}</td>
      <td>
        {price} CZK
        <br />
        na kg
      </td>
      <td className="text-center">
        <button onClick={addMore} disabled={onLastValue}>
          Up
        </button>
        {actualReview}
        <button onClick={addLess} disabled={onFirstValue}>
          Down
        </button>
        <br />z 10
      </td>
      <td className="pr-3.6">
        <div className="flex justify-end">
          <div className="mr-3">
            <Image src="/icons/related_products.svg" width={35} height={35} />
          </div>
          <div>
            <Image
              src="/icons/change_stars.svg"
              width={35}
              height={35}
              className="ml-40"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
