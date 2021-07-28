import FavouriteProducts from './FavouriteProducts';
import SpecialRequirements from './SpecialRequirements';
import DoctorExportButton from './DoctorExportButton';
import Title from './Title';

const CatToggleDetail = ({ catData }: any) => {
  const { contact_doctor, specials } = catData;
  return (
    <div className="flex-col grid grid-rows divide-y divide-gray_lightest pt-3.6 font-light">
      <div></div>
      {specials && specials.length > 0 && (
        <div className="px-3 py-3.6">
          <Title title="Špeciálne požiadavky" fontSize="text-sm" />
          <div className="flex">
            <SpecialRequirements name={specials} />
          </div>
        </div>
      )}
      {contact_doctor.email && (
        <div className="pt-3.6 px-3">
          <DoctorExportButton catContactData={contact_doctor} />
        </div>
      )}
    </div>
  );
};

export default CatToggleDetail;
