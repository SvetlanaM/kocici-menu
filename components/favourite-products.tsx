import ProductImage from './product-image';
import ProductName from './product-name';
import setUppercaseTitle from '../utils/set-uppercase-title';

const FavouriteProducts = ({ product }) => {
  return (
    <div className="flex pb-3.6 justify-start items-center">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="ml-3"
      />
      <div className="ml-3.6">
        <ProductName
          brand={setUppercaseTitle(product.brand_type)}
          name={setUppercaseTitle(product.name)}
        />
      </div>
    </div>
  );
};

export default FavouriteProducts;
