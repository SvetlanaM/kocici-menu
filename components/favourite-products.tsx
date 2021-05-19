import ProductImage from './product-image';
import ProductName from './product-name';
import setUppercaseTitle from '../utils/set-uppercase-title';
import truncateText from '../utils/truncate-text';

const FavouriteProducts = ({ product }) => {
  return (
    <div className="flex justify-start items-center">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="ml-3"
      />
      <div className="ml-2">
        <ProductName
          brand={setUppercaseTitle(product.brand_type)}
          name={setUppercaseTitle(truncateText(product.name, 20))}
        />
      </div>
    </div>
  );
};

export default FavouriteProducts;
