import ProductImage from './product-image';
import ProductName from './product-name';

const FavouriteProducts = ({ product }) => {
  return (
    <div className="flex pb-3.6 justify-around items-center">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="ml-3"
      />
      <div>
        <ProductName brand={product.brand_type} name={product.name} />
      </div>
    </div>
  );
};

export default FavouriteProducts;
