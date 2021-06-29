import Layout from '../../components/layout';
import Header from '../../components/head';
import AuthWrapper from '../../components/auth-wrapper';
import AuthRightContainer from '../../components/auth-right-container';
import AuthLeftContainer from '../../components/auth-left-container';
import Image from '../../components/image';
import AuthForm from '../../components/auth-form';
import getTitle from '../../utils/get-title';

export default function Login() {
  const link = {
    url: '/user/register',
    name: 'Registrovať',
  };

  return (
    <Layout>
      <Header title={getTitle('Prihlásiť sa')} />
      <AuthWrapper>
        <AuthRightContainer
          title="Ahoj!"
          subtitle="Prihlásiť sa do aplikácie alebo"
          link={link}
          form={
            <AuthForm
              submitText="Prihlásiť sa"
              passwordPlaceholder="Zadajte heslo"
              authMethod="loginUser"
            />
          }
          buttonInfo={true}
          footerLinks="Sveťa app 2021 Podmienky používania, Ochrana súkromia"
        />
        <AuthLeftContainer className="flex items-center justify-center p-10 xl-custom:p-0">
          <Image src="/icons/login.svg" height={425} width={462} />
        </AuthLeftContainer>
      </AuthWrapper>
    </Layout>
  );
}
