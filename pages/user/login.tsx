import Layout from '../../components/Layout';
import Header from '../../components/Head';
import AuthWrapper from '../../components/AuthWrapper';
import AuthRightContainer from '../../components/AuthRightContainer';
import AuthLeftContainer from '../../components/AuthLeftContainer';
import Image from '../../components/Image';
import AuthForm from '../../components/AuthForm';
import getTitle from '../../utils/getTitle';

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
