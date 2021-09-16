import Image from './Image';
import DoctorExportLink from './DoctorExportLink';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

const DoctorExportButton = ({ catContactData }) => {
  const { t } = useTranslation();
  return (
    <DoctorExportLink catContactData={catContactData}>
      <div className="flex flex-start">
        <Image src="/icons/email.svg" width={25} height={15} />
        <h3 className="text-gray font-lg font-bold ml-2">
          {t(cs['write_doctor'])}
        </h3>
      </div>
    </DoctorExportLink>
  );
};

export default DoctorExportButton;
