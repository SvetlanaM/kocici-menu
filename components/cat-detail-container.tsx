import CatFilter from './cat-filter';
import CatDetailInfoBox from './cat-detail-info-box';
import CatDetailCostChart from './cat-detail-cost-chart';
import CatDetailProductTable from './cat-detail-product-table';

const CatDetailContainer = (data) => {
  return (
    <>
      <CatFilter cats={['Stacy', 'Oberyn']} />
      <CatDetailInfoBox />
      <CatDetailCostChart />
      <div className="grid grid-cols-2 grid-flow-row gap-x-12 w-full">
        <CatDetailProductTable />
        <CatDetailProductTable />
      </div>
    </>
  );
};

export default CatDetailContainer;
