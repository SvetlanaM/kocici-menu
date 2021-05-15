import { Product } from '../graphql/generated/graphql';

interface ProductNameProps {
  brand: Product['brand_type'];
  name: Product['name'];
}

const ProductName = ({ brand, name }: ProductNameProps) => {
  return (
    <>
      <span className="base-medium-text text-purple">{brand}</span>
      <br />
      <span className="small-purple-text">{name}</span>
    </>
  );
};

export default ProductName;
