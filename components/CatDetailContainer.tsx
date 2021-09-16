import CatFilter from './CatFilter';
import CatDetailInfoBox from './CatDetailInfoBox';
import CatDetailCostChart from './CatDetailCostChart';
import CatDetailProductTable from './CatDetailProductTable';
import {
  CatFieldsFragmentFragment,
  GetCatDetailQuery,
  GetProductsQuery,
} from '../graphql/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CenterContainer from './CenterContainer';
import LeftContainer from './LeftContainer';
import AddCatBox from './AddCatBox';
import CatDetailPieChart from './CatDetailPieChart';
import useLocalStorage, { LocalStorageKey } from '../hooks/useLocalStorage';
import { BackLinkType } from '../utils/backlinks';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
interface CatDetailContainerProps {
  cats: GetCatDetailQuery['cat'];
  products: GetProductsQuery['products'];
}

const CatDetailContainer = ({ cats, products }: CatDetailContainerProps) => {
  const { t } = useTranslation();
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
      }),
    };
  };

  let [savedCat, setSavedCat] = useLocalStorage(
    LocalStorageKey.SELECTED_CAT,
    null
  );
  const setCatEditOpened = () => {
    setSavedCat(selectedCat);
  };

  const initialCat =
    cats.find((cat) => savedCat && cat.id === savedCat) ?? cats[0];

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
    setSavedCat(null);
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

    return Number(item && item.match(numberPattern)[0]);
  };

  const average = (arr) =>
    arr.reduce((p, c) => Math.ceil(p) + Math.ceil(c), 0) / arr.length;

  const getAnalysisValue = (value: string) => {
    let data = catData.reviews.map((item) =>
      item.products.analysis_variant
        ? Object.entries(item.products.analysis_variant)
            .filter((item) => item[0] === value)
            .map((item) => {
              return item[1];
            })
        : item.products.analysis_main
        ? Object.entries(item.products.analysis_main)
            .filter((item) => item[0] === value)
            .map((item) => {
              return item[1];
            })
        : [0]
    );
    return Number(Math.ceil(average(data)).toFixed(2)) || 0;
  };

  const avgBielType = getAnalysisValue('bílkovina');
  const avgFiber = getAnalysisValue('hrubá vláknina');
  const avgAsh = getAnalysisValue('popel/popelovina');
  const avgAll = [avgBielType, avgFiber, avgAsh];
  const sumAll = avgAll.reduce((a, b) => a + b, 0);

  const othersType = 100 - sumAll;
  const mergedStats = [...avgAll, othersType];

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
        <CatDetailInfoBox data={catData} onEditCat={setCatEditOpened} />
        <div className="w-3/12 pl-7">
          <AddCatBox
            backlink={BackLinkType.MY_CATS}
            onNewCat={setCatEditOpened}
          />
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
          title={t(cs['newest_reviews'])}
          catReviews={catReviews.slice(0, 5)}
          cats={[catModalData]}
          products={productsTemp}
        />
        <CatDetailProductTable
          data={getRProducts}
          name={catData.name}
          title={t(cs['suggested_reviews'])}
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
