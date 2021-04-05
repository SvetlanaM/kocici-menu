import Image from 'next/image';

const DoctorExportButton = () => {
  return (
    <>
      <div className="flex">
        <Image src="/icons/email.svg" width={25} height={15} />
        <h3 className="text-gray font-lg font-bold">Exportovat doktorovi</h3>
      </div>
    </>
  );
};

export default DoctorExportButton;
