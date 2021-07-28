import Image from './Image';
import Link from 'next/link';

const DoctorExportLink = ({ catContactData, children }) => {
  let notDefined = 'Neuvedene';
  const subject = `Informacie k macke: ${catContactData.name}`;
  const body = `Obsah emailu: %0D Meno macky: ${
    catContactData.name
  } %0D Vek macky: ${
    catContactData.age ? catContactData.age : notDefined
  } %0D Vaha macky: ${
    catContactData.weigth ? catContactData.weigth : notDefined
  } %0D`;

  return (
    <a
      href={`mailto:${catContactData.email}?subject=${subject}&body=${body}`}
      className=""
    >
      {children}
    </a>
  );
};

export default DoctorExportLink;
