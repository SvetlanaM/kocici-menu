import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CatFieldsFragmentFragment } from '../graphql/generated/graphql';
import cs from '../public/locales/cs/common.json';

interface DoctorExportLinkProps {
  catContactData: {
    email: CatFieldsFragmentFragment['doctor_email'];
    age: CatFieldsFragmentFragment['age'];
    weight: CatFieldsFragmentFragment['weight'];
    name: CatFieldsFragmentFragment['name'];
    gender: CatFieldsFragmentFragment['gender'];
  };
  children: React.ReactNode;
}

const DoctorExportLink = ({
  catContactData,
  children,
}: DoctorExportLinkProps): JSX.Element => {
  const { t } = useTranslation();
  const notDefined = t(cs['none']);
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
    catContactData.gender ? t(cs[catContactData.gender]) : notDefined
  } %0D ${t(cs['cat_weight'])} ${
    catContactData.weight ? catContactData.weight : notDefined
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
