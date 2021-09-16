import Image from './Image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';

const DoctorExportLink = ({ catContactData, children }) => {
  const { t } = useTranslation();
  let notDefined = t(cs['none']);
  const subject = `${t(cs['information_about_cat'])} ${catContactData.name}`;
  const body = `${t(cs['email_body'])} %0D ${t(cs['cat_name'])} ${
    catContactData.name
  } %0D ${t(cs['cat_age'])} ${
    catContactData.age
      ? catContactData.age
      : catContactData.age === 0
      ? t(cs['to_year'])
      : notDefined
  } %0D ${t(cs['gender'])} ${
    catContactData.gender ? catContactData.gender : notDefined
  } %0D ${t(cs['cat_weight'])} ${
    catContactData.weigth ? catContactData.weigth : notDefined
  } %0D`;

  return (
    <Link
      href={`mailto:${catContactData.email}?subject=${subject}&body=${body}`}
    >
      {children}
    </Link>
  );
};

export default DoctorExportLink;
