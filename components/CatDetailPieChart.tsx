import Title from './Title';
import { Pie } from 'react-chartjs-2';
import Image from './Image';

import { useMemo } from 'react';

interface CatDetailPieChartProps {
  aggData: Array<number>;
}

const CatDetailPieChart = ({ aggData }: CatDetailPieChartProps) => {
  const data = useMemo(() => {
    return {
      labels: ['% mäsa', '% bielkovín', '% ostatne'],
      type: 'pie',
      datasets: [
        {
          label: 'kvalita stravy',
          data: aggData,
          backgroundColor: ['#BDBDE7', '#E1E5EE', '#A6A6C8'],
          borderWidth: 1,
        },
      ],
    };
  }, [aggData]);

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    height: 200,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'end',
      },
    },
  };

  function checkZeros() {
    return !aggData.some((item) => item === 'NaN');
  }

  return (
    <div className="mt-5 w-full graph-container">
      <Title title={`Kvalita stravy mačky (pripravujeme)`} />
      {checkZeros() ? (
        <Pie data={data} options={options} />
      ) : (
        <Image
          src="/icons/no-data.png"
          height={220}
          width={220}
          className="mx-auto"
        />
      )}
    </div>
  );
};

export default CatDetailPieChart;
