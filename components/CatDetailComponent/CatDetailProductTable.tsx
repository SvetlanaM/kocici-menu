import Image from '../Image';
import Title from '../Title';
import { Line } from 'react-chartjs-2';
import FavouriteProducts from '../FavouriteProducts';
import { gql } from '@apollo/client';
import React, { useState } from 'react';
import {
  CatFieldsFragmentFragment,
  GetProductsQuery,
  SelectCatFieldsFragment,
} from '../../graphql/generated/graphql';
import AddProductReviewModal from '../AddProductReviewModal';
import Link from 'next/link';
import NoReviews from '../NoReviews';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

export const ProductFieldsFragment = gql`
  fragment ProductFieldsFragment on Product {
    brand_type
    name
    image_url
    id
    path
    note
    feeding
    rating
    product_type
    analysis_main
    analysis_variant
  }
`;

type CatSelectOptions = {
  id: SelectCatFieldsFragment['id'];
  name: SelectCatFieldsFragment['name'];
  image_url: SelectCatFieldsFragment['image_url'];
  reviews: SelectCatFieldsFragment['reviews'];
};

interface CatDetailProductTableProps {
  data:
    | CatFieldsFragmentFragment['reviews'][0]['products'][]
    | GetProductsQuery['products'];
  title: string;
  catReviews: number[][];
  shuffleData?: () => void;
  cats?: Array<CatSelectOptions>;
  products?: GetProductsQuery['products'];
}

const CatDetailProductTable = ({
  data,
  title,
  catReviews,
  shuffleData,
  cats,
  products,
}: CatDetailProductTableProps): JSX.Element => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [rowNumber, setRowNumber] = useState<number>();
  const { t } = useTranslation();

  console.log(catReviews);
  const graphData = (order: number) => {
    return {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          data: catReviews[order].slice(0, 5).reverse(),
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

  const openModal = (order?: number) => {
    setRowNumber(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mt-5 w-full">
      {modalIsOpen ? (
        <AddProductReviewModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          selectCats={cats}
          selectProducts={products}
          onSaveSuccess={handleReviewAdded}
          index={rowNumber}
        />
      ) : null}
      <div className="flex flex-col xl-custom:flex-row justify-between items-center xl-custom:items-center text-gray text-left">
        <Title title={`${title}`} />
        {title === t(cs['suggested_reviews']) ? (
          <button
            onClick={() => {
              shuffleData();
            }}
          >
            <div className="inline-flex pb-5 xl-custom:mb-0 text-right">
              <Image src="/icons/reload.svg" height={15} width={15} />{' '}
              <span className="ml-2">{t(cs['new_products'])}</span>
            </div>
          </button>
        ) : (
          <>
            <Link href="/my-cats">
              <a
                onClick={() => openModal()}
                className="text-gray pb-5 xl-custom:mb-0 text-right"
              >
                {t(cs['add_review_small'])}
              </a>
            </Link>
          </>
        )}
      </div>

      {data && data.length > 0 ? (
        <div className="border-rounded-base border-gray">
          <div className="grid divide-y divide-gray_lightest">
            {data.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="pt-2 flex pb-1 justify-between items-center">
                  <div className="w-full">
                    <FavouriteProducts key={item.id} product={item} />
                  </div>
                  <div className="canvas-graph ml-3 xl-custom:ml-0">
                    {item.reviewhistory && item.reviewhistory.length > 0 ? (
                      <Line data={graphData(index)} options={options} />
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
                      </>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <NoReviews />
      )}
    </div>
  );
};

export default CatDetailProductTable;
