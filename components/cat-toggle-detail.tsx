import FavouriteProducts from './favourite-products';
import SpecialRequirements from './special-requirements';
import DoctorExportButton from './doctor-export-button';

const CatToggleDetail = ({ data }) => {
  return (
    <div className="flex flex-col grid grid-rows divide-y divide-gray_lightest pt-3.6">
      <div></div>
      <div className="px-3">
        <FavouriteProducts />
      </div>
      <div className="px-3">
        <SpecialRequirements />
      </div>
      <div className="pt-3.6 px-3">
        <DoctorExportButton />
      </div>
    </div>
  );
};

export default CatToggleDetail;
