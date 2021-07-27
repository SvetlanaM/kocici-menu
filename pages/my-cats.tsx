import getTitle from '../utils/getTitle';
import AddCatBox from '../components/AddCatBox';
import Container from '../components/Container';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Head';
import CenterContainer from '../components/CenterContainer';
import LeftContainer from '../components/LeftContainer';
import CatDetailContainer from '../components/CatDetailContainer';
import ErrorScreen from '../components/ErrorScreen';
import Loading from '../components/Loading';
import { GeneralError } from '../components/ErrorScreen';
import { getUser, setUser } from '../utils/user';
import CatDetailSpecials from '../components/CatDetailSpecials';
import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/CatBox';
import {
  GetCatDetailQueryVariables,
  useGetCatDetailQuery,
  useGetProductsQuery,
} from '../graphql/generated/graphql';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import CatDetailEmptyBox from '../components/CatDetailEmptyBox';

const CatDetailQuery = () => {
  const {
    data: catData,
    error: catError,
    loading: catLoading,
  } = useGetCatDetailQuery({
    variables: {
      user_id: getUser(),
      limit: 5,
      withProducts: true,
    },
  });

  const { data: productData } = useGetProductsQuery();

  return (
    <>
      {catLoading && (
        <CenterContainer>
          <Loading />
        </CenterContainer>
      )}
      {catError && (
        <CenterContainer>
          <ErrorScreen error={GeneralError.fromApolloError(catError)} />
        </CenterContainer>
      )}

      {productData && catData && catData.cat.length > 0 ? (
        <CatDetailContainer
          cats={catData.cat}
          products={productData.products}
        />
      ) : <>
          <CenterContainer>{catLoading && <Loading />}</CenterContainer>
          <LeftContainer>
            <div className="mt-4 mt-9.5 xl-custom:mt-9.5">
              <AddCatBox />
            </div>
          </LeftContainer>
        </> ? (
        <>{catData && catData.cat.length === 0 && <CatDetailEmptyBox />}</>
      ) : null}
    </>
  );
};
const pageTitle = getTitle('Moje mačky');

export default function MyCats() {
  return (
    <Layout>
      <Header title={pageTitle} />
      <Sidebar />
      <Container>
        <CatDetailQuery />
      </Container>
    </Layout>
  );
}
