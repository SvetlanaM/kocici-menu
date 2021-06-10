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
import { GeneralError } from '../components/error-screen';
import { getUser, setUser } from '../utils/user';
import CatDetailSpecials from '../components/cat-detail-specials';
import { gql } from '@apollo/client';
import { CatFieldsFragment } from '../components/cat-box';
import {
  GetCatDetailQueryVariables,
  useGetCatDetailQuery,
  useGetProductsQuery,
} from '../graphql/generated/graphql';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';

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
      <CenterContainer>
        {catLoading && <Loading />}
        {catError && (
          <ErrorScreen error={GeneralError.fromApolloError(catError)} />
        )}
      </CenterContainer>

      {productData && catData && (
        <CatDetailContainer
          cats={catData.cat}
          products={productData.products}
        />
      )}
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
