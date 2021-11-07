import CatFilter from './CatFilter';
import CatDetailInfoBox from './CatDetailInfoBox';
import CatDetailCostChart from './CatDetailCostChart';
import CatDetailProductTable from './CatDetailProductTable';
import {
  CatFieldsFragmentFragment,
  GetCatDetailQuery,
  GetProductsQuery,
  SelectCatFieldsFragment,
} from '../../graphql/generated/graphql';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

type CatSelectOptions = {
  id: SelectCatFieldsFragment['id'];
  name: SelectCatFieldsFragment['name'];
  image_url: SelectCatFieldsFragment['image_url'];
  reviews: SelectCatFieldsFragment['reviews'];
};

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

  const modalFactory = (
    cat: CatFieldsFragmentFragment
  ): Array<CatSelectOptions> => {
    return [
      {
        id: cat.id,
        name: cat.name,
        image_url: cat.image_url,
        reviews: cat.reviews.map((review) => {
          const reviews = review.products.reviewhistory
            .filter((review) => review.cat_id === cat.id)
            .reverse();
          return {
            product_id: review.products.id,
            review_type: reviews[0] && String(reviews[0].review_type),
          };
        }),
      },
    ];
  };

  const initialCat =
    cats.find((cat) => savedCat && cat.id === savedCat) ?? cats[0];
  const modalData = modalFactory(initialCat);
  interface catSummaryDataProps {
    selectedCat: CatFieldsFragmentFragment['id'];
    catData: CatFieldsFragmentFragment;
    catReviews: number[][];
    catModalData: Array<CatSelectOptions>;
  }

  const [catSummaryData, setSelectedCat] = useState<catSummaryDataProps>({
    selectedCat: initialCat.id,
    catData: initialCat,
    catReviews: [],
    catModalData: modalData,
  });

  useEffect(() => {
    setSelectedCat({
      selectedCat: initialCat.id,
      catData: initialCat,
      catReviews: getCatReviewHistory(initialCat),
      catModalData: modalData,
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
    );
  };

  const setCatData = useCallback(
    (id: number) => {
      const cat = getCatData(id);
      const review = cat ? getCatReviewHistory(cat) : [];
      const catModal = modalFactory(cat);

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
    const data: number[] = catSummaryData.catData.reviews
      .flatMap((item) =>
        item.products.analysis_variant
          ? Object.entries(item.products.analysis_variant)
              .filter((item) => item[0] === value)
              .map((item) => {
                return item[1] as number;
              })
          : item.products.analysis_main
          ? Object.entries(item.products.analysis_main)
              .filter((item) => item[0] === value)
              .map((item) => {
                return item[1] as number;
              })
          : [0]
      )
      .filter(Number);

    return Number(Math.ceil(average(data))) || 0;
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
      <CatFilter
        cats={cats}
        setCatFunction={setCatData}
        selectedCat={catSummaryData.selectedCat}
      />
      <div className="w-full flex justify-between flex-col xl-custom:flex-row">
        <CatDetailInfoBox
          data={catSummaryData.catData}
          onEditCat={setCatEditOpened}
        />
        <div className="w-full xl-custom:w-3/12 xl-custom:pl-7 h-full mt-8 xl-custom:mt-0">
          <AddCatBox backlink={BackLinkType.MY_CATS} />
        </div>
      </div>
      <div className="w-full grid grid-rows-2 xl-custom:grid-rows-1 xl-custom:grid-cols-2 gap-11 pb-16 -mt-5 xl-custom:mt-3">
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
          catReviews={catSummaryData.catReviews}
          cats={catSummaryData.catModalData}
          products={productsTemp}
        />
        <CatDetailProductTable
          data={getRProducts}
          title={t(cs['suggested_reviews'])}
          catReviews={catSummaryData.catReviews}
          shuffleData={shuffleData}
          products={getRProducts}
          cats={catSummaryData.catModalData}
        />
      </div>
    </>
  );
};

export default CatDetailContainer;
