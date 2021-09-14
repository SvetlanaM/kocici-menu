import Title from './Title';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import sk from '../public/locales/sk/common.json';
interface CatDetailCostChartProps {
  data1: number[];
  data2: number[];
  selectedCat: number;
}

const CatDetailCostChart = ({
  data1,
  data2,
  selectedCat,
}: CatDetailCostChartProps) => {
  const { t } = useTranslation();
  const mergeData = [...data1, ...data2];
  const allMonths = [
    t(sk['january']),
    t(sk['february']),
    t(sk['march']),
    t(sk['april']),
    t(sk['may']),
    t(sk['june']),
    t(sk['july']),
    t(sk['august']),
    t(sk['september']),
    t(sk['october']),
    t(sk['november']),
    t(sk['december']),
  ];

  const currentMonth = moment(moment(), 'YYYY/MM/DD').format('M');
  const currentYear = moment(moment(), 'YYYY/MM/DD').format('Y');

  const data = useMemo(() => {
    return {
      labels: allMonths.slice(0, Number(currentMonth)).slice(-6),
      datasets: [
        {
          label: t(sk['wet_food_short']),
          data: data1,
          backgroundColor: '#BDBDE7',
          borderRadius: '5',
          fill: true,
        },
        {
          label: t(sk['dry_food']),
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
        // defining min and max so hiding the dataset does not change scale range
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
      <Title title={t(sk['half_year_costs'])} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default CatDetailCostChart;
