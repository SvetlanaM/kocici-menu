import Layout from '../../components/Layout';
import Header from '../../components/Head';
import AuthWrapper from '../../components/AuthWrapper';
import AuthRightContainer from '../../components/AuthRightContainer';
import AuthLeftContainer from '../../components/AuthLeftContainer';
import Image from '../../components/Image';
import AuthForm from '../../components/AuthForm';
import getTitle from '../../utils/getTitle';

export default function Register() {
  const link = {
    url: '/user/login',
    name: 'Prihlásiť',
  };

  const registerProItems = [
    'Cats is a 2019 musical fantasy film based',
    '1981 Tony Award-winning stage musical',
    'Cats was theatrically released in the United Kingdom',
    'Cats is a 2019 musical fantasy film based',
    'Budget of $80 – $100 million, and is estimated to have lost',
  ];

  return (
    <Layout>
      <Header title={getTitle('Registrovať sa')} />
      <AuthWrapper>
        <AuthRightContainer
          title="Začni vytvorením účtu"
          subtitle="Registrovať sa do aplikácie alebo"
          link={link}
          form={
            <AuthForm
              submitText="Registrovať sa"
              passwordPlaceholder="Min. 8 znakov a 1 veľké písmeno"
              authMethod="signupUser"
            />
          }
          buttonInfo={false}
          footerLinks="Vytvorením účtu, súhlasíte s našimi Podmienkami používania"
        />
        <AuthLeftContainer className="flex flex-col pt-10  px-10 xl-custom:px-20 justify-center">
          <h2 className="text-white text-3xl font-medium">
            Pridaj si svoje mačky a nakupuj Victoria, a young white cat
          </h2>
          <ul className="pt-6 text-white font-light">
            {registerProItems.map((item, index) => (
              <li key={index} className="mb-7">
                <Image
                  src="/icons/checked-white.svg"
                  height={15}
                  width={15}
                  className="inline mr-3"
                />
                {item}
              </li>
            ))}
          </ul>
        </AuthLeftContainer>
      </AuthWrapper>
    </Layout>
  );
}
