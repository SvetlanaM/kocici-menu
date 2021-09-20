import Title from './Title';
import {
  GetDashboardQuery,
  SelectCatFieldsFragment,
} from '../graphql/generated/graphql';
import TableFooter from './TableFooter';
import Table from './Table';

type CatSelectOptions = {
  id: SelectCatFieldsFragment['id'];
  name: SelectCatFieldsFragment['name'];
  image_url: SelectCatFieldsFragment['image_url'];
  reviews: SelectCatFieldsFragment['reviews'];
};
interface TopFiveTableProps {
  reviews: GetDashboardQuery['reviews'];
  selectCats?: Array<CatSelectOptions>;
  selectProducts?: GetDashboardQuery['selectProducts'];
  onReviewSaveSuccess?: () => void;
  title: string;
  footerType: 'HOMEPAGE' | 'PRODUCTS';
  numberOfProducts: number;
}

const TopFiveTable = ({
  reviews,
  selectCats,
  selectProducts,
  title,
  numberOfProducts,
  onReviewSaveSuccess,
}: TopFiveTableProps): JSX.Element => {
  return (
    <>
      <Title title={title} />

      <Table
        reviews={reviews}
        Footer={
          <TableFooter
            selectCats={selectCats && selectCats}
            selectProducts={selectProducts && selectProducts}
            onSaveSuccess={onReviewSaveSuccess}
          />
        }
        numberOfProducts={numberOfProducts}
        offsetNumber={0}
      />
    </>
  );
};

export default TopFiveTable;
