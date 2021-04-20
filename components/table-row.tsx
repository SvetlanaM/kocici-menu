import Image from 'next/image';
import { gql } from '@apollo/client';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';
import ProductImage from './product-image';
import ProductName from './product-name';
import DateFormatObject from '../utils/get-format-date';
import ReactTooltip from 'react-tooltip';
import StarIcon from './star-icon';
import setUppercaseTitle from '../utils/set-uppercase-title';
import truncateText from '../utils/truncate-text';

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
  const formattedDate = DateFormatObject(updated_at).formatWithReplace();
  const reviewArray = [1, 2, 3, 4, 5];
  return (
    <tr>
      <td className="pl-3.6 py-4">
        <ProductImage
          src={product.image_url}
          alt={`${product.brand_type} - ${product.name}`}
        />
      </td>
      <td>
        <ProductName
          brand={setUppercaseTitle(product.brand_type || '')}
          name={setUppercaseTitle(truncateText(product.name, 15))}
        />
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
        <div className="flex flex-row justify-items-center justify-center">
          {reviewArray.map((review, key) => (
            <span className="mr-1">
              <StarIcon
                key={key}
                isChecked={review <= Number(review_type) ? true : false}
              />
            </span>
          ))}
        </div>
      </td>
      <td className="pr-3.6">
        <div className="flex justify-end">
          <div className="mr-3">
            <a data-tip data-for="relatedProducts">
              <Image src="/icons/related_products.svg" width={35} height={35} />
            </a>
            <ReactTooltip
              id="relatedProducts"
              place="bottom"
              textColor="white"
              backgroundColor="#3E3E70"
              effect="solid"
              data-offset="{'top': 30}"
            >
              {'Suvisiace produkty'}
            </ReactTooltip>
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
