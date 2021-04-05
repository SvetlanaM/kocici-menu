import ProductImage from './product-image';
import ProductName from './product-name';
import Title from './title';

const FavouriteProducts = ({ items }) => {
  return (
    <div className="py-3.6">
      <Title title="Obľúbené produkty" fontSize="text-sm" />
      <div className="flex">
        <ProductImage src="/" alt="nazov" className="ml-3" />
        <div>
          <ProductName brand="Applaws" name="Kuraci" />
        </div>
      </div>
    </div>
  );
};

export default FavouriteProducts;
