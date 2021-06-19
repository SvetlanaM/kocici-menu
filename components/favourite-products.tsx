import ProductImage from './product-image';
import ProductName from './product-name';
import setUppercaseTitle from '../utils/set-uppercase-title';
import truncateText from '../utils/truncate-text';
import { useState } from 'react';

const FavouriteProducts = ({ product }) => {
  return (
    <div className="flex justify-start items-center py-2">
      <ProductImage
        src={product.image_url}
        alt={product.name}
        className="ml-3"
        width={50}
      />

      <div className="ml-3.6">
        <ProductName
          brand={product.brand_type}
          name={setUppercaseTitle(
            truncateText(product.name, 35),
            product.brand_type
          )}
        />
      </div>
    </div>
  );
};

export default FavouriteProducts;
