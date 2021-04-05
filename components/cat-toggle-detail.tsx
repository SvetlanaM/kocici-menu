import FavouriteProducts from './favourite-products';
import SpecialRequirements from './special-requirements';
import DoctorExportButton from './doctor-export-button';
import Title from './title';

const CatToggleDetail = ({ catData }) => {
  const { reviews, doctor_email, specials } = catData;
  return (
    <div className="flex flex-col grid grid-rows divide-y divide-gray_lightest pt-3.6 font-light">
      <div></div>
      {reviews && (
        <div className="px-3 pt-3.6">
          <Title title="Obľúbené produkty" fontSize="text-sm" />
          {reviews.map((item) => (
            <FavouriteProducts key={item.name} product={item} />
          ))}
        </div>
      )}
      <div className="px-3 py-3.6">
        <Title title="Špeciálne požiadavky" fontSize="text-sm" />
        <SpecialRequirements />
      </div>
      {doctor_email && (
        <div className="pt-3.6 px-3">
          <DoctorExportButton email={doctor_email} />
        </div>
      )}
    </div>
  );
};

export default CatToggleDetail;
