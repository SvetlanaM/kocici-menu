import ProductImage from './product-image';
import ProductName from './product-name';
import Title from './title';
import { Line } from 'react-chartjs-2';
import FavouriteProducts from './favourite-products';

const CatDetailProductTable = ({ data, name, title, catReviews }) => {
  console.log(catReviews[0]);

  const data1 = (order: number) => {
    return {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [
        {
          label: '',
          data: catReviews[order],
          fill: false,
          backgroundColor: '#3E3E70',
          borderColor: '#3E3E70',
          borderWidth: '1',
          showLine: true,
        },
      ],
    };
  };

  const options = {
    layout: {
      padding: 20,
    },
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
      display: false,
      x: {
        // defining min and max so hiding the dataset does not change scale range
        display: false,
        backdropColor: '#000',
        color: '#E1E5EE',
        grid: {
          display: false,
          drawOnChartArea: false,
          lineWidth: 0,
        },
        ticks: {
          display: false,
          beginAtZero: false,
          stepSize: 1,
        },
      },
      y: {
        // defining min and max so hiding the dataset does not change scale range
        backdropColor: '#000',

        grid: {
          display: false,
          drawOnChartArea: false,
          lineWidth: 0,
        },
        color: '#E1E5EE',
        display: false,
        ticks: {
          display: false,
          beginAtZero: false,
          stepSize: 0.5,
        },
      },
    },
  };

  return (
    <div className="mt-5">
      <Title title={`${title} produkty mačky ${name}`} />
      {data && data.length > 0 && (
        <div className="border-rounded-base border-gray">
          <div className="grid divide-y divide-gray_lightest">
            {data.map((item, index) => (
              <>
                <div className="pt-2 flex pb-1 justify-start items-center">
                  <div className="w-2/3">
                    <FavouriteProducts key={item} product={item} />
                  </div>
                  <div className="w-2/4 ml-auto float-auto">
                    {item.reviewhistory && item.reviewhistory.length > 0 && (
                      <Line data={data1(index)} options={options} />
                    )}
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
