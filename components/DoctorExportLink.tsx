import Image from './Image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';

const DoctorExportLink = ({ catContactData, children }) => {
  const { t } = useTranslation();
  let notDefined = t(sk['none']);
  const subject = `${t(sk['information_about_cat'])} ${catContactData.name}`;
  const body = `${t(sk['email_body'])} %0D ${t(sk['cat_name'])} ${
    catContactData.name
  } %0D ${t(sk['cat_age'])} ${
    catContactData.age
      ? catContactData.age
      : catContactData.age === 0
      ? t(sk['to_year'])
      : notDefined
  } %0D ${t(sk['gender'])} ${
    catContactData.gender ? catContactData.gender : notDefined
  } %0D ${t(sk['cat_weight'])} ${
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
