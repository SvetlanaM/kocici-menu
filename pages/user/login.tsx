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

export default function Login() {
  const { t } = useTranslation();
  const link = {
    url: '/user/register',
    name: t(cs['register']),
  };

  return (
    <Layout>
      <Header title={getTitle(t(cs['login']))} />
      <AuthWrapper>
        <AuthRightContainer
          title={t(cs['hello'])}
          subtitle={t(cs['login_or'])}
          link={link}
          form={
            <AuthForm
              submitText={t(cs['login'])}
              passwordPlaceholder={t(cs['enter_pass'])}
              authMethod="loginUser"
            />
          }
          buttonInfo={true}
          footerLinks={t(cs['copy'])}
        />
        <AuthLeftContainer className="flex items-center justify-center p-10 xl-custom:p-0">
          <Image src="/icons/login.svg" height={425} width={462} />
        </AuthLeftContainer>
      </AuthWrapper>
    </Layout>
  );
}
