import FavouriteProducts from './favourite-products';
import SpecialRequirements from './special-requirements';
import DoctorExportButton from './doctor-export-button';
import Title from './title';

const CatToggleDetail = ({ catData }: any) => {
  const { reviews, doctor_email, specials } = catData;
  return (
    <div className="flex-col grid grid-rows divide-y divide-gray_lightest pt-3.6 font-light">
      <div></div>
      {reviews && reviews.length > 0 && (
        <div className="px-3 pt-3.6">
          <Title title="Obľúbené produkty" fontSize="text-sm" />
          {reviews.map((item) => (
            <FavouriteProducts key={item.name} product={item} />
          ))}
        </div>
      )}
      {specials && specials.length > 0 && (
        <div className="px-3 py-3.6">
          <Title title="Špeciálne požiadavky" fontSize="text-sm" />
          <div className="flex">
            <ul>
              {specials.map((item) => (
                <SpecialRequirements name={item.name} key={item.name} />
              ))}
            </ul>
          </div>
        </div>
      )}
      {doctor_email && (
        <div className="pt-3.6 px-3">
          <DoctorExportButton email={doctor_email} />
        </div>
      )}
    </div>
  );
};

export default CatToggleDetail;
