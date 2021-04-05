import Image from 'next/image';
import Link from 'next/link';

const DoctorExportButton = ({ email }) => {
  return (
    <Link href={`mailto: ${email}`}>
      <a className="flex justify-between">
        <Image src="/icons/email.svg" width={25} height={15} />
        <h3 className="text-gray font-lg font-bold">Exportovat doktorovi</h3>
      </a>
    </Link>
  );
};

export default DoctorExportButton;
