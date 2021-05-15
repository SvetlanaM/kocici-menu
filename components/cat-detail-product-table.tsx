import ProductImage from './product-image';
import ProductName from './product-name';
import Title from './title';
import { Line } from 'react-chartjs-2';

const data = {
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

const CatDetailProductTable = () => {
  return (
    <div className="mt-5">
      <Title title="Oblubene produkty Stacy" />
      <div className="grid divide-y divide-gray_lightest border-rounded-base border-gray">
        <div className="flex pb-3.6 justify-start items-center">
          <ProductImage src="" alt="" className="ml-3" />
          <div className="ml-3.6">
            <ProductName brand="Felix" name="kura" />
          </div>
          <div className="w-1/2">
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="flex pb-3.6 justify-start items-center">
          <ProductImage src="" alt="" className="ml-3" />
          <div className="ml-3.6">
            <ProductName brand="Felix" name="kura" />
          </div>
          <div className="w-1/2">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatDetailProductTable;
