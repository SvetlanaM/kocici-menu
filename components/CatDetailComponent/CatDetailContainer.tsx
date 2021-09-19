import CatFilter from './CatFilter';
import CatDetailInfoBox from './CatDetailInfoBox';
import CatDetailCostChart from './CatDetailCostChart';
import CatDetailProductTable from './CatDetailProductTable';
import {
  CatFieldsFragmentFragment,
  GetCatDetailQuery,
  GetProductsQuery,
} from '../../graphql/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CenterContainer from '../Containers/CenterContainer';
import AddCatBox from '../AddCatBox';
import CatDetailPieChart from './CatDetailPieChart';
import useLocalStorage, { LocalStorageKey } from '../../hooks/useLocalStorage';
import { BackLinkType } from '../../utils/backlinks';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

interface CatDetailContainerProps {
  cats: GetCatDetailQuery['cat'];
  products: GetProductsQuery['products'];
}

const CatDetailContainer = ({
  cats,
  products,
}: CatDetailContainerProps): JSX.Element => {
  const { t } = useTranslation();
  const [savedCat, setSavedCat] = useLocalStorage(
    LocalStorageKey.SELECTED_CAT,
    null
  );
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const setCatEditOpened = () => {
    setSavedCat(catSummaryData.selectedCat);
  };
  const catFactory = (
    cat: CatFieldsFragmentFragment
  ): Record<string, unknown> => {
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
          review_type: reviews[0] && reviews[0].review_type,
        };
      }),
    };
  };

  const initialCat =
    cats.find((cat) => savedCat && cat.id === savedCat) ?? cats[0];
  const initialData = catFactory(initialCat);

  interface catSummaryDataProps {
    selectedCat: CatFieldsFragmentFragment['id'];
    catData: CatFieldsFragmentFragment;
    catReviews: number[][];
    catModalData: Record<string, unknown>;
  }

  const [catSummaryData, setSelectedCat] = useState<catSummaryDataProps>({
    selectedCat: initialCat.id,
    catData: initialCat,
    catReviews: [],
    catModalData: initialData,
  });

  useEffect(() => {
    setSelectedCat({
      selectedCat: initialCat.id,
      catData: initialCat,
      catReviews: getCatReviewHistory(initialCat),
      catModalData: initialData,
    });
    setSavedCat(null);
  }, []);

  const productsTemp = products.filter(
    (x) =>
      !catSummaryData.catData.reviews
        .map((item) => item.products.id)
        .includes(x.id)
  );

  const getCatReviewHistory = (cat: CatFieldsFragmentFragment): number[][] => {
    return cat.reviews.map((product) =>
      product.products.reviewhistory
        .filter((review) => review.cat_id === cat.id)
        .map((review) => review.review_type)
        .reverse()
    );
  };

  const setCatData = useCallback(
    (id: number) => {
      const cat = getCatData(id);
      const review = cat ? getCatReviewHistory(cat) : [];
      const catModal = catFactory(cat);
      setSelectedCat({
        selectedCat: id,
        catData: cat,
        catReviews: review,
        catModalData: catModal,
      });
      return id;
    },
    [cats, initialCat, catSummaryData.selectedCat]
  );

  const getCatData = (id: number): CatFieldsFragmentFragment => {
    return cats.find((i) => i.id === id);
  };

  const randomDataG = [...new Array(6)].map(
    () => Math.floor((Math.random() * 3000) / 10) * 10 + 800
  );

  const randomDataK = [...new Array(6)].map(
    () => Math.floor(Math.random() * 3000) + 800
  );

  const catProducts = Object.values(
    catSummaryData && catSummaryData.catData.reviews.slice(0, 5)
  ).map((review) => review.products);

  const shuffleData = () => {
    setIsShuffled(!isShuffled);
  };

  const getRProducts = useMemo(() => {
    return products
      .slice()
      .sort(() => 0.5 - Math.random())
      .filter((x) => !catProducts.map((item) => item.name).includes(x.name))
      .slice(0, 5);
  }, [isShuffled, catSummaryData.selectedCat]);

  const average = (arr: number[]): number =>
    arr.reduce((p, c) => Math.ceil(p) + Math.ceil(c), 0) / arr.length;

  const getAnalysisValue = (value: string): number => {
    const data: unknown[] = catSummaryData.catData.reviews.map((item) =>
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
    return Number(Math.ceil(average([Number(data)])).toFixed(2)) || 0;
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
          selectedCat={catSummaryData.selectedCat}
        />
      </CenterContainer>
      <div className="w-full flex justify-between">
        <CatDetailInfoBox
          data={catSummaryData.catData}
          onEditCat={setCatEditOpened}
        />
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
          selectedCat={catSummaryData.selectedCat}
        />
        <CatDetailPieChart aggData={mergedStats} />
      </div>
      <div className="grid grid-rows xl-custom:grid-rows-1 xl-custom:grid-cols-2 grid-flow-row gap-x-12 w-full">
        <CatDetailProductTable
          data={catProducts}
          title={t(cs['newest_reviews'])}
          catReviews={catSummaryData.catReviews.slice(0, 5)}
          cats={[catSummaryData.catModalData]}
          products={productsTemp}
        />
        <CatDetailProductTable
          data={getRProducts}
          title={t(cs['suggested_reviews'])}
          catReviews={catSummaryData.catReviews}
          shuffleData={shuffleData}
          products={getRProducts}
          cats={[catSummaryData.catModalData]}
        />
      </div>
    </>
  );
};

export default CatDetailContainer;
