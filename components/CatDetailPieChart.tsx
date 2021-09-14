import Title from './Title';
import { Pie } from 'react-chartjs-2';
import Image from './Image';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
import { useMemo } from 'react';

interface CatDetailPieChartProps {
  aggData: Array<number>;
}

const CatDetailPieChart = ({ aggData }: CatDetailPieChartProps) => {
  const { t } = useTranslation();
  const data = useMemo(() => {
    return {
      labels: [t(sk['protein']), t(sk['fiber']), t(sk['ash']), t(sk['others'])],
      type: 'pie',
      datasets: [
        {
          label: t(sk['food_quality']),
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
      <Title title={t(sk['food_quality_%'])} />
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
