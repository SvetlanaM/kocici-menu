import CatFilter from './cat-filter';
import CatDetailInfoBox from './cat-detail-info-box';
import CatDetailCostChart from './cat-detail-cost-chart';
import CatDetailProductTable from './cat-detail-product-table';
import {
  CatDetailFieldsFragmentFragment,
  GetCatDetailQuery,
  GetProductsQuery,
  Product,
  ProductFieldsFragmentFragment,
} from '../graphql/generated/graphql';
import { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { getUser } from '../utils/user';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import AddCatBox from '../components/add-cat-box';
interface CatDetailContainerProps {
  cats: GetCatDetailQuery['cat'];
  products: GetProductsQuery['products'];
}

const CatDetailContainer = ({ cats, products }: CatDetailContainerProps) => {
  const catFactory = (id, name, image_url, reviews) => {
    return {
      id,
      name,
      image_url,
      reviews,
    };
  };

  let initialData = catFactory(
    cats[0].id,
    cats[0].name,
    cats[0].image_url,
    cats[0].reviews.map((review) => {
      return {
        product_id: review.products.id,
        review_type: review.products.reviewhistory.filter(
          (review) => review.cat_id === cats[0].id
        )[0].review_type,
      };
    })
  );
  const [[selectedCat, catData, catReviews, catModalData], setSelectedCat] =
    useState([cats[0].id, cats[0], [], initialData]);

  useEffect(() => {
    setSelectedCat([
      cats[0].id,
      cats[0],
      getCatReviewHistory(cats[0]),
      initialData,
    ]);
  }, []);

  const getCatReviewHistory = (cat) => {
    return cat.reviews.map((product) =>
      product.products.reviewhistory
        .filter((review) => review.cat_id === cat.id)
        .map((review) => review.review_type)
    );
  };
  const setCatData = useCallback(
    (id: number) => {
      let cat = getCatData(id);
      let review = cat ? getCatReviewHistory(cat) : [];

      let catModal = catFactory(
        cat.id,
        cat.name,
        cat.image_url,
        cat.reviews.map((review) => {
          return {
            product_id: review.products.id,
            review_type: review.products.reviewhistory.filter(
              (review) => review.cat_id === cat.id
            )[0].review_type,
          };
        })
      );

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

  const catProducts = Object.values(catData.reviews!).map(
    (review) => review.products
  );

  const shuffleData = () => {
    setIsShuffled(!isShuffled);
  };

  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  const getRProducts = useMemo(() => {
    const recommendedProducts = products.map((product) => product);
    const shuffled = recommendedProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
    let difference = shuffled
      .map((item) => item)
      .filter((x) => !catProducts.map((item) => item.name).includes(x.name))
      .slice(0, 5);
    return difference;
  }, [isShuffled, selectedCat]);

  return (
    <>
      <CenterContainer>
        <CatFilter
          cats={cats}
          setCatFunction={setCatData}
          selectedCat={selectedCat}
        />
        <CatDetailInfoBox data={catData} />
        <CatDetailCostChart
          data1={randomDataG}
          data2={randomDataK}
          selectedCat={selectedCat}
        />
      </CenterContainer>
      <LeftContainer>
        <div className="mt-9.5">
          <AddCatBox />
        </div>
      </LeftContainer>
      <div className="grid grid-cols-2 grid-flow-row gap-x-12 w-full">
        <CatDetailProductTable
          data={catProducts}
          name={catData.name}
          title="Obľúbené"
          catReviews={catReviews}
          cats={[catModalData]}
          products={products}
        />
        <CatDetailProductTable
          data={getRProducts}
          name={catData.name}
          title="Navrhované"
          catReviews={catReviews}
          shuffleData={shuffleData}
        />
      </div>
    </>
  );
};

export default CatDetailContainer;
