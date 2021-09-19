import SpecialRequirements from './SpecialRequirements';
import DoctorExportButton from './DoctorExportButton';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';

interface CatToggleDetailProps {
  catData: Record<
    'contact_doctor',
    {
      email: CatFieldsFragmentFragment['doctor_email'];
      age: CatFieldsFragmentFragment['age'];
      weight: CatFieldsFragmentFragment['weight'];
      name: CatFieldsFragmentFragment['name'];
      gender: CatFieldsFragmentFragment['gender'];
    }
  > &
    Record<'specials', CatFieldsFragmentFragment['note']>;
}

const CatToggleDetail = ({ catData }: CatToggleDetailProps): JSX.Element => {
  const { t } = useTranslation();
  const { contact_doctor, specials } = catData;
  return (
    <div className="flex-col grid grid-rows divide-y divide-gray_lightest pt-3.6 font-light">
      <div></div>
      {specials && specials.length > 0 && (
        <div className="px-3.6 pt-3.6">
          <Title
            title={t(cs['special_requirements'])}
            fontSize="text-sm"
            paddingBottom="pb-2"
          />
          <div className="flex">
            <SpecialRequirements name={specials} />
          </div>
        </div>
      )}

      {contact_doctor.email && (
        <div className={`${specials && 'mt-3'} pt-3.6 px-3`}>
          <DoctorExportButton catContactData={contact_doctor} />
        </div>
      )}
    </div>
  );
};

export default CatToggleDetail;
