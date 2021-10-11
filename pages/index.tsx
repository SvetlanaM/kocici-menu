import Header from '../components/Head';
import { useTranslation } from 'react-i18next';
import cs from '../public/locales/cs/common.json';
import getTitle from '../utils/getTitle';
import HomepageWrapper from '../components/Homepage/HomepageWrapper';
import HomepageLeftContainer from '../components/Homepage/HomepageLeftContainer';
import HomepageRightContainer from '../components/Homepage/HomepageRightContainer';
import WhySection from '../components/Homepage/WhySection';
import FeatureWrapper from '../components/Homepage/FeatureWrapper';
import AboutWrapper from '../components/Homepage/AboutWrapper';
import ProsWrapper from '../components/Homepage/ProsWrapper';
import Footer from '../components/Homepage/Footer';

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
      <FeatureWrapper />
      <AboutWrapper />
      <ProsWrapper />
      <Footer />
    </div>
  );
}
