import Title from '../Title';
import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cs from '../../public/locales/cs/common.json';
import { CURRENT_MONTH } from '../../utils/constants';
interface CatDetailCostChartProps {
  data1: number[];
  data2: number[];
  selectedCat: number;
}

const CatDetailCostChart = ({
  data1,
  data2,
  selectedCat,
}: CatDetailCostChartProps): JSX.Element => {
  const { t } = useTranslation();
  const allMonths = [
    t(cs['january']),
    t(cs['february']),
    t(cs['march']),
    t(cs['april']),
    t(cs['may']),
    t(cs['june']),
    t(cs['july']),
    t(cs['august']),
    t(cs['september']),
    t(cs['october']),
    t(cs['november']),
    t(cs['december']),
  ];

  const data = useMemo(() => {
    return {
      labels: allMonths.slice(0, Number(CURRENT_MONTH)).slice(-6),
      datasets: [
        {
          label: t(cs['wet_food_short']),
          data: data1,
          backgroundColor: '#BDBDE7',
          borderRadius: '5',
          fill: true,
        },
        {
          label: t(cs['dry_food']),
          data: data2,
          backgroundColor: '#E1E5EE',
          borderRadius: '5',
          fill: true,
        },
      ],
    };
  }, [selectedCat]);

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 500,
        max: 4000,
        backdropColor: '#000',
        color: '#E1E5EE',
        ticks: {
          beginAtZero: true,
          stepSize: 500,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'end',
      },
    },
  };

  return (
    <div className="mt-5 w-full graph-container">
      <Title title={t(cs['half_year_costs'])} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default CatDetailCostChart;
