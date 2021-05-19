import CatFilter from './cat-filter';
import CatDetailInfoBox from './cat-detail-info-box';
import CatDetailCostChart from './cat-detail-cost-chart';
import CatDetailProductTable from './cat-detail-product-table';
import {
  CatDetailFieldsFragmentFragment,
  GetCatDetailQuery,
} from '../graphql/generated/graphql';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
interface CatDetailContainerProps {
  cats: GetCatDetailQuery['cat'];
}
const CatDetailContainer = ({ cats }: CatDetailContainerProps) => {
  const [[selectedCat, catData], setSelectedCat] = useState([
    cats[0].id,
    cats[0],
  ]);

  const setCatData = (id: number) => {
    let cat = getCatData(id);
    setSelectedCat([id, cat]);
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

  console.log(cats);
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
        <CatDetailProductTable data={catProducts} name={catData.name} />
        <CatDetailProductTable data={catData} />
      </div>
    </>
  );
};

export default CatDetailContainer;
