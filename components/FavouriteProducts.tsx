import ProductImage from './ProductImage';
import ProductName from './ProductName';
import setUppercaseTitle from '../utils/setUppercaseTitle';
import truncateText from '../utils/truncateText';
import { ProductFieldsFragmentFragment } from '../graphql/generated/graphql';

interface FavouriteProductsProps {
  product: ProductFieldsFragmentFragment;
}

const FavouriteProducts = ({
  product,
}: FavouriteProductsProps): JSX.Element => {
  return (
    <div className="flex justify-start items-center py-2 h-20">
      <div className="cat-image justify-center items-center flex">
        <ProductImage src={product.image_url} alt={product.name} />
      </div>

      <div className="ml-3.6">
        <ProductName
          brand={product.brand_type}
          name={setUppercaseTitle(truncateText(product.name, 35))}
        />
      </div>
    </div>
  );
};

export default FavouriteProducts;
