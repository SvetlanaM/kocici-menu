import { Product } from '../graphql/generated/graphql';

interface ProductNameProps {
  brand: Product['brand_type'];
  name: Product['name'];
}

const ProductName = ({ brand, name }: ProductNameProps): JSX.Element => {
  return (
    <>
      <span className="base-medium-text text-purple">{brand}</span>
      <br />
      <span className="small-purple-text mr-3 xl-custom:pr-0">{name}</span>
    </>
  );
};

export default ProductName;
