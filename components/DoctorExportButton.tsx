import Image from './Image';
import DoctorExportLink from './DoctorExportLink';

const DoctorExportButton = ({ catContactData }) => {
  return (
    <DoctorExportLink catContactData={catContactData}>
      <div className="flex flex-start">
        <Image src="/icons/email.svg" width={25} height={15} />
        <h3 className="text-gray font-lg font-bold ml-2">Poslať doktorovi</h3>
      </div>
    </DoctorExportLink>
  );
};

export default DoctorExportButton;
