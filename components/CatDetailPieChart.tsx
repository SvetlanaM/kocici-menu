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
      labels: ['bielkoviny', 'hrubá vláknina', 'popel', 'ostatné'],
      type: 'pie',
      datasets: [
        {
          label: 'kvalita stravy',
          data: aggData,
          backgroundColor: ['#A6A6C8', '#E1E5EE', '#3E3E70', '#BDBDE7'],
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
    return !aggData.some((item) => item === 100);
  }

  return (
    <div className="mt-5 w-full graph-container">
      <Title title={`Kvalita stravy mačky v %`} />
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
