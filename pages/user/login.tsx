import Layout from '../../components/layout';
import Header from '../../components/head';
import AuthWrapper from '../../components/auth-wrapper';
import AuthRightContainer from '../../components/auth-right-container';
import AuthLeftContainer from '../../components/auth-left-container';
import Image from '../../components/image';
import AuthForm from '../../components/auth-form';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';

export default function Login() {
  const link = {
    url: '/user/register',
    name: 'Registrovat',
  };

  useAuth();

  return (
    <Layout>
      <Header title="Prihlasit sa" />
      <AuthWrapper>
        <AuthRightContainer
          title="Ahoj!"
          subtitle="Prihlasit sa do aplikacie alebo"
          link={link}
          form={
            <AuthForm
              submitText="Prihlasit sa"
              passwordPlaceholder="Zadajte heslo"
              authMethod="loginUser"
            />
          }
          buttonInfo={true}
          footerLinks="Sveťa app 2021 Podmienky používania, Ochrana súkromia"
        />
        <AuthLeftContainer className="flex items-center justify-center">
          <Image src="/icons/login.svg" height={425} width={462} />
        </AuthLeftContainer>
      </AuthWrapper>
    </Layout>
  );
}
