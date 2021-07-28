import ProductImage from './ProductImage';
import ProductName from './ProductName';
import Image from './Image';
import Title from './Title';
import { Line } from 'react-chartjs-2';
import FavouriteProducts from './FavouriteProducts';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  CatDetailFieldsFragmentFragment,
  CatFieldsFragmentFragment,
  GetCatDetailQuery,
  GetProductsQuery,
  ProductFieldsFragmentFragment,
  SelectCatFieldsFragment,
} from '../graphql/generated/graphql';
import AddProductReviewModal from './AddProductReviewModal';
import Link from 'next/link';
import truncateText from '../utils/truncateText';

export const ProductFieldsFragment = gql`
  fragment ProductFieldsFragment on Product {
    brand_type
    name
    image_url
    id
    path
    path
    meal
    meal_type
    other_type
    note
    daily_food
    conservants
    feeding
    ingredient_name
    amount
    unit
  }
`;

interface CatDetailProductTableProps {
  data: GetProductsQuery['products'];
  name: string;
  title: string;
  catReviews: Array<any>;
  shuffleData?: () => void;
  cats?: SelectCatFieldsFragment;
  products?: GetProductsQuery['products'];
}

const CatDetailProductTable = ({
  data,
  name,
  title,
  catReviews,
  shuffleData,
  cats,
  products,
}: CatDetailProductTableProps) => {
  const data1 = (order: number) => {
    return {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          data: catReviews[order],
          fill: false,
          borderColor: '#9595bc',
          tension: 0,
        },
      ],
    };
  };

  const handleReviewAdded = () => {
    shuffleData && shuffleData();
  };

  const options = {
    responsive: true,
    layout: {
      padding: 5,
    },
    animation: false,
    plugins: {
      legend: {
        display: false,
        show: false,
        labels: {
          textAlign: 'left',
        },
      },
    },
    label: {
      display: false,
    },
    scales: {
      x: {
        display: false,
        backdropColor: '#000',
        color: '#E1E5EE',
        grid: {
          display: false,
          drawOnChartArea: false,
          lineWidth: 0,
        },
        ticks: {
          display: false,
          beginAtZero: false,
          stepSize: 1,
        },
      },
      y: {
        backdropColor: '#000',
        min: 0,
        max: 8,
        color: '#E1E5EE',
        display: false,
        ticks: {
          display: true,
          beginAtZero: true,
          stepSize: 20,
          min: 0,
          max: 6,
        },
      },
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [rowNumber, setRowNumber] = useState<number>();

  const openModal = (order: number) => {
    setRowNumber(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mt-5 w-full">
      <div className="flex flex-col xl-custom:flex-row justify-between items-center xl-custom:items-center text-gray text-left">
        <Title title={`${title} produkty`} />
        {title === 'Navrhované' ? (
          <button
            onClick={() => {
              shuffleData();
            }}
          >
            <div className="inline-flex pb-5 xl-custom:mb-0 text-right">
              <Image src="/icons/reload.svg" height={15} width={15} />{' '}
              <span className="ml-2">Nové produkty</span>
            </div>
          </button>
        ) : (
          <>
            <Link href="/my-cats">
              <a
                onClick={openModal}
                className="text-gray pb-5 xl-custom:mb-0 text-right"
              >
                + Pridať hodnotenie
              </a>
            </Link>
            <AddProductReviewModal
              isOpen={modalIsOpen}
              closeModal={closeModal}
              selectCats={cats}
              selectProducts={products}
              onSaveSuccess={handleReviewAdded}
            />
          </>
        )}
      </div>
      {data && data.length > 0 ? (
        <div className="border-rounded-base border-gray">
          <div className="grid divide-y divide-gray_lightest">
            {data.map((item, index) => (
              <>
                <div className="pt-2 flex pb-1 justify-between items-center">
                  <div className="w-full">
                    <FavouriteProducts key={item.id} product={item} />
                  </div>
                  <div className="canvas-graph ml-3 xl-custom:ml-0">
                    {item.reviewhistory && item.reviewhistory.length > 0 ? (
                      <Line data={data1(index)} options={options} />
                    ) : (
                      <>
                        <Link href="/my-cats">
                          <a
                            onClick={() => openModal(index)}
                            className="text-gray"
                          >
                            <Image
                              src="/icons/add.svg"
                              width={30}
                              className="mr-10"
                            />
                          </a>
                        </Link>
                        <AddProductReviewModal
                          isOpen={modalIsOpen}
                          closeModal={closeModal}
                          selectCats={cats}
                          selectProducts={products}
                          onSaveSuccess={handleReviewAdded}
                          index={rowNumber}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-rounded-base border-gray">
          <div className="flex flex-col justify-between items-center px-8 pt-5 pb-4">
            <Image src="/icons/no-reviews.svg" width={150} />
            <h1 className="font-semibold text-gray mt-4">
              {`Žiadne ${title.toLowerCase()} produkty`}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatDetailProductTable;