import Image from 'next/image';
import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';

export const ReviewFieldsFragment = gql`
  fragment ReviewFieldsFragment on Review {
    product: Product {
      id
      name
      brand_type
      price
      image_url
    }
    cat: Cat {
      id
    }
    updated_at
    review_type
  }
`;

const TableRow = ({
  product,
  updated_at,
  review_type,
}: ReviewFieldsFragmentFragment) => {
  const [actualReview, setReview] = useState<number>(Number(review_type));
  const addMore = () => setReview((prev) => prev + 1);
  const addLess = () => setReview((prev) => prev - 1);
  const onLastValue = actualReview === 10;
  const onFirstValue = actualReview === 1;

  return (
    <tr>
      <td className="pl-3.6 py-4">
        <Image
          src={product.image_url}
          alt={`${product.brand_type} - ${product.name}`}
          width={55}
          height={55}
          quality={100}
        />
      </td>
      <td>
        <span className="base-medium-text">{product.brand_type}</span>
        <br />
        {product.name}
      </td>
      <td>{updated_at}</td>
      <td>
        {product.price} CZK
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
