import Container from '../components/Containers/Container';
import Header from '../components/Head';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import getTitle from '../utils/getTitle';
import HomepageWrapper from '../components/Homepage/HomepageWrapper';
import HomepageLeftContainer from '../components/Homepage/HomepageLeftContainer';
import HomepageRightContainer from '../components/Homepage/HomepageRightContainer';
import WhySection from '../components/Homepage/WhySection';

export default function HomePage(): JSX.Element {
  const { t } = useTranslation();
  const pageTitle = getTitle(t(cs['homepage']));
  return (
    <div className="font-light leading-normal">
      <Header title={pageTitle} />
      <HomepageWrapper>
        <HomepageLeftContainer />
        <HomepageRightContainer />
      </HomepageWrapper>
      <WhySection />
    </div>
  );
}
