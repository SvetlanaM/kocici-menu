import Layout from '../../components/Layout';
import Header from '../../components/Head';
import AuthWrapper from '../../components/AuthWrapper';
import AuthRightContainer from '../../components/AuthRightContainer';
import AuthLeftContainer from '../../components/AuthLeftContainer';
import Image from '../../components/Image';
import AuthForm from '../../components/AuthForm';
import getTitle from '../../utils/getTitle';
import { useTranslation } from 'react-i18next';
import sk from '../../public/locales/sk/common.json';

export default function Login() {
  const { t } = useTranslation();
  const link = {
    url: '/user/register',
    name: t(sk['register']),
  };

  return (
    <Layout>
      <Header title={getTitle(t(sk['login']))} />
      <AuthWrapper>
        <AuthRightContainer
          title={t(sk['hello'])}
          subtitle={t(sk['login_or'])}
          link={link}
          form={
            <AuthForm
              submitText={t(sk['login'])}
              passwordPlaceholder={t(sk['enter_pass'])}
              authMethod="loginUser"
            />
          }
          buttonInfo={true}
          footerLinks={t(sk['copy'])}
        />
        <AuthLeftContainer className="flex items-center justify-center p-10 xl-custom:p-0">
          <Image src="/icons/login.svg" height={425} width={462} />
        </AuthLeftContainer>
      </AuthWrapper>
    </Layout>
  );
}
