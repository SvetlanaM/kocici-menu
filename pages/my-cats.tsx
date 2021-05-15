import getTitle from '../utils/get-title';
import AddCatBox from '../components/add-cat-box';
import Container from '../components/container';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import Header from '../components/head';
import CenterContainer from '../components/center-container';
import LeftContainer from '../components/left-container';
import CatDetailContainer from '../components/cat-detail-container';
import ErrorScreen from '../components/error-screen';
import Loading from '../components/loading';
import { TIP_LIMIT } from '../utils/constants';
import { GeneralError } from '../components/error-screen';
import setUppercaseTitle from '../utils/set-uppercase-title';
import { getUser } from '../utils/user';
import Title from '../components/title';
import CatDetailSpecials from '../components/cat-detail-specials';
const pageTitle = getTitle('Moje macky');

export default function MyCats() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        {/* <CenterContainerQuery /> */}
        <CenterContainer>
          <CatDetailContainer data={[]} />
        </CenterContainer>
        <LeftContainer>
          <div className="mt-9.5">
            <AddCatBox />
          </div>
          <CatDetailSpecials />
        </LeftContainer>
      </Container>
    </Layout>
  );
}
