import Image from 'next/image';
import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';
import ProductImage from './product-image';
import ProductName from './product-name';
import DateFormatObject from '../utils/get-format-date';

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
  const formattedDate = DateFormatObject(updated_at).formatWithReplace();
  return (
    <tr>
      <td className="pl-3.6 py-4">
        <ProductImage
          src={product.image_url}
          alt={`${product.brand_type} - ${product.name}`}
        />
      </td>
      <td>
        <ProductName brand={product.brand_type} name={product.name} />
      </td>
      <td>
        Pred <br />
        {formattedDate}
      </td>
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
