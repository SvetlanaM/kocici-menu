import CatFilter from './CatFilter';
import CatDetailInfoBox from './CatDetailInfoBox';
import CatDetailCostChart from './CatDetailCostChart';
import CatDetailProductTable from './CatDetailProductTable';
import { CatFieldsFragmentFragment, GetCatDetailQuery, GetProductsQuery, } from '../graphql/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CenterContainer from './CenterContainer';
import LeftContainer from './LeftContainer';
import AddCatBox from './AddCatBox';
import CatDetailPieChart from './CatDetailPieChart';
import useLocalStorage, { LocalStorageKey } from "../hooks/useLocalStorage";
import { BackLinkType } from "../utils/backlinks";

interface CatDetailContainerProps {
  cats: GetCatDetailQuery['cat'];
  products: GetProductsQuery['products'];
}

const CatDetailContainer = ({ cats, products }: CatDetailContainerProps) => {
  const catFactory = (cat: CatFieldsFragmentFragment) => {
    return {
        id: cat.id,
        name: cat.name,
        image_url: cat.image_url,
        reviews: cat.reviews.map((review) => {
            const reviews = review.products.reviewhistory
                .filter((review) => review.cat_id === cat.id)
                .reverse();
            return {
                product_id: review.products.id,
                review_type: reviews[0] ? reviews[0].review_type : [],
            };
        })
    };
  };

  let [ savedCat, setSavedCat ] = useLocalStorage(LocalStorageKey.SELECTED_CAT, 0)

  const initialCat = cats.find(cat => cat.id === savedCat) ?? cats[0]

  let initialData = catFactory(initialCat);
  const [[selectedCat, catData, catReviews, catModalData], setSelectedCat] =
    useState([initialCat.id, initialCat, [], initialData]);

  useEffect(() => {
    setSelectedCat([
        initialCat.id,
        initialCat,
        getCatReviewHistory(initialCat),
        initialData,
    ]);
  }, []);

  const productsTemp = products.filter(
    (x) => !catData.reviews.map((item) => item.products.id).includes(x.id)
  );

  const getCatReviewHistory = (cat) => {
    return cat.reviews.map((product) =>
      product.products.reviewhistory
        .filter((review) => review.cat_id === cat.id)
        .map((review) => review.review_type)
        .reverse()
    );
  };
  const setCatData = useCallback(
    (id: number) => {
      let cat = getCatData(id);
      let review = cat ? getCatReviewHistory(cat) : [];

      let catModal = catFactory(cat);

      setSelectedCat([id, cat, review, catModal]);
      setSavedCat(id)

      return id;
    },
    [cats]
  );

  const getCatData = (id: number) => {
    return cats.find((i) => i.id === id);
  };

  const randomDataG = [...new Array(6)].map(
    () => Math.floor((Math.random() * 3000) / 10) * 10 + 800
  );

  const randomDataK = [...new Array(6)].map(
    () => Math.floor(Math.random() * 3000) + 800
  );

  const catProducts = Object.values(catData.reviews.slice(0, 5)!).map(
    (review) => review.products
  );

  const shuffleData = () => {
    setIsShuffled(!isShuffled);
  };

  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  const getRProducts = useMemo(() => {
    return products
        .slice()
        .sort(() => 0.5 - Math.random())
        .filter((x) => !catProducts.map((item) => item.name).includes(x.name))
        .slice(0, 5);
  }, [isShuffled, selectedCat]);

  const getNumber = (item: any): number => {
    const numberPattern = /\d+/g;

    return Number(item.match(numberPattern)[0]);
  };

  const mealTypes = catData.reviews
    .map((item) =>
      item.products.meal_type !== null ? getNumber(item.products.meal_type) : 0
    )
    .filter((item) => item !== 0);

  const bielTypes = catData.reviews
    .map((item) =>
      item.products.amount !== null ? getNumber(item.products.amount) : 0
    )
    .filter((item) => item !== 0);

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  const avgMealType = average(mealTypes).toFixed(2) || 0;
  const avgBielType = Math.ceil(average(bielTypes)).toFixed(2) || 0;
  const othersType = 100 - (Number(avgMealType) + Number(avgBielType));
  const mergedStats = [avgMealType, avgBielType, othersType];

  return (
    <>
      <CenterContainer>
        <CatFilter
          cats={cats}
          setCatFunction={setCatData}
          selectedCat={selectedCat}
        />
      </CenterContainer>
      <div className="w-full flex justify-between">
        <CatDetailInfoBox data={catData} />
        <div className="w-3/12 pl-7">
          <AddCatBox backlink={BackLinkType.MY_CATS} />
        </div>
      </div>
      <div className="w-full grid grid-rows-2 xl-custom:grid-rows-1 xl-custom:grid-cols-2 gap-11 pb-16 mt-3">
        <CatDetailCostChart
          data1={randomDataG}
          data2={randomDataK}
          selectedCat={selectedCat}
        />
        <CatDetailPieChart aggData={mergedStats} />
      </div>
      <div className="grid grid-rows xl-custom:grid-rows-1 xl-custom:grid-cols-2 grid-flow-row gap-x-12 w-full">
        <CatDetailProductTable
          data={catProducts}
          name={catData.name}
          title="Najnovšie hodnotenia"
          catReviews={catReviews.slice(0, 5)}
          cats={[catModalData]}
          products={productsTemp}
        />
        <CatDetailProductTable
          data={getRProducts}
          name={catData.name}
          title="Navrhované produkty"
          catReviews={catReviews}
          shuffleData={shuffleData}
          products={getRProducts}
          cats={[catModalData]}
        />
      </div>
    </>
  );
};

export default CatDetailContainer;
