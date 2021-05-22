import CatFilter from './cat-filter';
import CatDetailInfoBox from './cat-detail-info-box';
import CatDetailCostChart from './cat-detail-cost-chart';
import CatDetailProductTable from './cat-detail-product-table';
import {
  CatDetailFieldsFragmentFragment,
  GetCatDetailQuery,
} from '../graphql/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { getUser } from '../utils/user';
interface CatDetailContainerProps {
  cats: GetCatDetailQuery['cat'];
}

const CatDetailContainer = ({ cats }: CatDetailContainerProps) => {
  const [[selectedCat, catData, catReviews], setSelectedCat] = useState([
    cats[0].id,
    cats[0],
    [],
  ]);

  const setCatData = (id: number) => {
    let cat = getCatData(id);
    let review = cat.reviews.map((product) =>
      product.products.reviewhistory.map((review) => review.review_type)
    );

    setSelectedCat([id, cat, review]);
    return id;
  };

  const getCatData = (id: number) => {
    return cats.find((i) => i.id === id);
  };

  const randomDataG = [...new Array(6)].map(
    () => Math.floor((Math.random() * 3000) / 10) * 10 + 800
  );

  const randomDataK = [...new Array(6)].map(
    () => Math.floor(Math.random() * 3000) + 800
  );

  const catProducts = Object.values(catData.reviews!).map(
    (review) => review.products
  );

  const reccommendedProducts = Object.values(catData.reccommeded!).map(
    (review) => review.product
  );

  return (
    <>
      <CatFilter
        cats={cats}
        setCatFunction={setCatData}
        selectedCat={selectedCat}
      />
      <CatDetailInfoBox data={catData} />
      <CatDetailCostChart data1={randomDataG} data2={randomDataK} />
      <div className="grid grid-cols-2 grid-flow-row gap-x-12 w-full">
        <CatDetailProductTable
          data={catProducts}
          name={catData.name}
          title="Obľúbené"
          catReviews={catReviews}
        />
        <CatDetailProductTable
          data={reccommendedProducts}
          name={catData.name}
          title="Navrhované"
          catReviews={catReviews}
        />
      </div>
    </>
  );
};

export default CatDetailContainer;
