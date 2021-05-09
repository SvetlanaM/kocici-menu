import Layout from '../../components/layout';
import Header from '../../components/head';
import AuthWrapper from '../../components/auth-wrapper';
import AuthRightContainer from '../../components/auth-right-container';
import AuthLeftContainer from '../../components/auth-left-container';
import Image from '../../components/image';
import AuthForm from '../../components/auth-form';
import Link from 'next/link';

export default function Register() {
  const link = {
    url: '/user/login',
    name: 'Prihlasit',
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
      <Header title="Registrovat sa" />
      <AuthWrapper>
        <AuthRightContainer
          title="Začni vytvorením účtu"
          subtitle="Registrovat sa do aplikacie alebo"
          link={link}
          form={
            <AuthForm
              submitText="Registrovat sa"
              passwordPlaceholder="Vytvorit silne heslo. Minimálne 8 znakov"
              authMethod="signupUser"
            />
          }
          buttonInfo={false}
          footerLinks="Vytvorením účtu, súhlasíte s našimi Podmienkami používania"
        />
        <AuthLeftContainer className="flex flex-col pt-32 px-20">
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