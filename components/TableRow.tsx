import Image from './Image';
import { gql } from '@apollo/client';
import { ReviewFieldsFragmentFragment } from '../graphql/generated/graphql';
import ProductImage from './ProductImage';
import ProductName from './ProductName';
import DateFormatObject from '../utils/getFormatDate';
import ReactTooltip from 'react-tooltip';
import StarIcon from './StarIcon';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import truncateText from '../utils/truncateText';
import ProductDetailsTooltipBox from './ProductDetailsTooltip';
import { useRef, useState } from 'react';
import Link from 'next/link';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useOnKeyPress from '../hooks/useOnKeyPress';

const REVIEW_TOGGLE_ID = 'popupReview';

export const ReviewFieldsFragment = gql`
  fragment ReviewFieldsFragment on Review {
    product: Product {
      id
      name
      brand_type
      price
      image_url
      path
      note
      feeding
      rating
      product_type
      analysis_main
      analysis_variant
    }
    cat: Cat {
      id
      name
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
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const closeCollapse = () => {
    setIsHidden(true);
  };

  useOnClickOutside(nodeRef, closeCollapse);
  useOnKeyPress('Escape', closeCollapse);

  return (
    <tr className="h-32 xl-custom:h-20" ref={nodeRef}>
      <td className="flex flex-row justify-center h-32 py-10 pl-5 xl-custom:pl-0 xl-custom:ml-0 xl-custom:h-20 xl-custom:py-3">
        <ProductImage
          src={product.image_url}
          alt={`${product.brand_type} - ${product.name}`}
        />
      </td>
      <td className="pl-10 xl-custom:px-2">
        <ProductName
          brand={product.brand_type}
          name={setUppercaseTitle(truncateText(product.name, 30))}
        />
      </td>
      <td className="px-10 xl-custom:px-2">
        Pred <br />
        {formattedDate}
      </td>
      <td>
        {product.price} CZK
        <br />
        na kg
      </td>
      <td className="text-center px-10 xl-custom:px-2">
        <div className="flex flex-row justify-items-center justify-center">
          {reviewArray.map((review, key) => (
            <span className="mr-1" key={key}>
              <StarIcon
                key={key}
                isChecked={review <= Number(review_type) ? true : false}
              />
            </span>
          ))}
        </div>
      </td>
      <td className="pr-3.6 px-10 xl-custom:px-3.6">
        <div className="flex justify-end">
          <div className="mr-3">
            <Link href={`https://www.zoohit.cz${product.path}`}>
              <a target="new">
                <Image
                  src="/icons/related_products.svg"
                  width={35}
                  height={35}
                />
              </a>
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsHidden((prevState) => !prevState)}
              aria-controls={REVIEW_TOGGLE_ID}
              aria-haspopup
              aria-expanded={isHidden}
            >
              <Image
                src="/icons/add-review.svg"
                width={35}
                height={35}
                className="ml-0"
              />
            </button>
            <div
              className={`${
                isHidden ? 'hidden' : 'block'
              } absolute bg-white tooltip-wrapper shadow-lg border-rounded-base border-gray_lightest w-full mx-1`}
              id={REVIEW_TOGGLE_ID}
            >
              <div className="relative">
                <div className="text-purple">
                  <svg
                    width="10"
                    height="15"
                    viewBox="0 0 10 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute tooltip-right"
                  >
                    <path d="M1 0L8.5 7V8L1 15V0Z" fill="white" />
                    <path
                      d="M1.33318 15C1.14102 15.0003 0.984978 14.8546 0.98462 14.6745C0.984457 14.5877 1.02125 14.5044 1.08685 14.443L8.49564 7.50019L1.08685 0.557356C0.950795 0.42985 0.950795 0.223137 1.08685 0.09563C1.2229 -0.0318767 1.44346 -0.0318767 1.57951 0.09563L9.23395 7.26935C9.36977 7.39668 9.36977 7.60308 9.23395 7.73044L1.57951 14.9041C1.51428 14.9655 1.42562 15 1.33318 15Z"
                      fill="#E0E0E0"
                    />
                  </svg>

                  <ProductDetailsTooltipBox data={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
