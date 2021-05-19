import ProductImage from './product-image';
import ProductName from './product-name';
import Title from './title';
import { Line } from 'react-chartjs-2';
import FavouriteProducts from './favourite-products';

const data1 = {
  labels: ['1', '2', '3', '4', '5'],
  datasets: [
    {
      label: '',
      data: [12, 19, 3, 5, 2],
      fill: false,
      backgroundColor: '#3E3E70',
      borderColor: '#3E3E70',
      borderWidth: '1',
      showLine: true,
    },
  ],
};

const options = {
  animation: false,
  plugins: {
    legend: {
      display: false,
      show: false,
      labels: {
        textAlign: 'left',
      },
    },
  },
  label: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const CatDetailProductTable = ({ data, name }) => {
  return (
    <div className="mt-5">
      <Title title={`Oblubene produkty macky ${name}`} />
      {data && data.length > 0 && (
        <div className="border-rounded-base border-gray">
          <div className="grid divide-y divide-gray_lightest">
            {data.map((item) => (
              <>
                <div className="pt-2 flex pb-1 justify-start items-center">
                  <FavouriteProducts key={item.name} product={item} />
                  <div className="w-1/2">
                    <Line data={data1} options={options} />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatDetailProductTable;
