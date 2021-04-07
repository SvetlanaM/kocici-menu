import { Product } from '../graphql/generated/graphql';

interface ProductNameProps {
  brand: Product['brand_type'];
  name: Product['name'];
}

const ProductName = ({ brand, name }: ProductNameProps) => {
  return (
    <>
      <span className="base-medium-text">{brand}</span>
      <br />
      {name}
    </>
  );
};

export default ProductName;