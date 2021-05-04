import Image from '../components/image';
import Link from 'next/link';

const DoctorExportButton = ({ email }) => {
  return (
    <Link href={`mailto: ${email}`}>
      <a className="flex flex-start">
        <Image src="/icons/email.svg" width={25} height={15} />
        <h3 className="text-gray font-lg font-bold ml-2">Poslať doktorovi</h3>
      </a>
    </Link>
  );
};

export default DoctorExportButton;
