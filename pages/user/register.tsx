import Layout from '../../components/Layout';
import Header from '../../components/Head';
import AuthWrapper from '../../components/Auth/AuthWrapper';
import AuthRightContainer from '../../components/Auth/AuthRightContainer';
import AuthLeftContainer from '../../components/Auth/AuthLeftContainer';
import Image from '../../components/Image';
import AuthForm from '../../components/Auth/AuthForm';
import getTitle from '../../utils/getTitle';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';

export default function Register(): JSX.Element {
  const { t } = useTranslation();
  const link = {
    url: '/user/login',
    name: t(cs['login1']),
  };

  const registerProItems = [
    { key: 1, value: 'reg_pros1' },
    { key: 2, value: 'reg_pros2' },
    { key: 3, value: 'reg_pros3' },
    { key: 4, value: 'reg_pros4' },
    {
      key: 5,
      value: 'reg_pros5',
    },
  ];

  return (
    <Layout>
      <Header title={getTitle(t(cs['register']))} />
      <AuthWrapper>
        <AuthRightContainer
          title={t(cs['register_start'])}
          subtitle={t(cs['register_or'])}
          link={link}
          form={
            <AuthForm
              submitText={t(cs['register'])}
              passwordPlaceholder={t(cs['pass_req'])}
              authMethod="signupUser"
            />
          }
          buttonInfo={false}
          footerLinks={t(cs['toc'])}
        />
        <AuthLeftContainer className="flex flex-col pt-10  px-10 xl-custom:px-20 justify-center">
          <h2 className="text-white text-3xl font-medium">
            {t(cs['register_title_pros'])}
          </h2>
          <ul className="pt-6 text-white font-light">
            {registerProItems.map((item) => (
              <li key={item.key} className="mb-7">
                <Image
                  src="/icons/checked-white.svg"
                  height={15}
                  width={15}
                  className="inline mr-3 -mt-1"
                />
                {t(cs[item.value])}
              </li>
            ))}
          </ul>
        </AuthLeftContainer>
      </AuthWrapper>
    </Layout>
  );
}
