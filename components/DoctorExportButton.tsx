import Image from './Image';
import DoctorExportLink from './DoctorExportLink';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';

interface catContactDataProps {
  catContactData: {
    email: CatFieldsFragmentFragment['doctor_email'];
    age: CatFieldsFragmentFragment['age'];
    weight: CatFieldsFragmentFragment['weight'];
    name: CatFieldsFragmentFragment['name'];
    gender: CatFieldsFragmentFragment['gender'];
  };
}
const DoctorExportButton = ({
  catContactData,
}: catContactDataProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <DoctorExportLink catContactData={catContactData}>
      <div className="flex flex-start cursor-pointer">
        <Image src="/icons/email.svg" width={25} height={15} />
        <h3 className="text-gray font-lg font-bold ml-2 hover:text-gray-600">
          {t(cs['write_doctor'])}
        </h3>
      </div>
    </DoctorExportLink>
  );
};

export default DoctorExportButton;
