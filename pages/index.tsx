import Header from '../components/Head';
import getTitle from '../utils/getTitle';
import HomepageWrapper from '../components/Homepage/HomepageWrapper';
import HomepageLeftContainer from '../components/Homepage/HomepageLeftContainer';
import HomepageRightContainer from '../components/Homepage/HomepageRightContainer';
import WhySection from '../components/Homepage/WhySection';
import FeatureWrapper from '../components/Homepage/FeatureWrapper';
import AboutWrapper from '../components/Homepage/AboutWrapper';
import ProsWrapper from '../components/Homepage/ProsWrapper';
import Footer from '../components/Homepage/Footer';
import Meta from '../components/Meta';

export default function HomePage(): JSX.Element {
  const pageTitle = getTitle('');
  return (
    <div>
      <Meta />
      <Header title={pageTitle} />
      <HomepageWrapper>
        <HomepageLeftContainer />
        <HomepageRightContainer />
      </HomepageWrapper>
      <div className="font-light leading-normal">
        <WhySection />
        <FeatureWrapper />
        <AboutWrapper />
        <ProsWrapper />
      </div>
      <Footer />
    </div>
  );
}
