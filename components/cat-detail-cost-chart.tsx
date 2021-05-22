import Title from '../components/title';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

interface CatDetailCostChartProps {
  data1: number[];
  data2: number[];
}

const CatDetailCostChart = ({ data1, data2 }: CatDetailCostChartProps) => {
  const mergeData = [...data1, ...data2];
  const allMonths = [
    'Január',
    'Február',
    'Marec',
    'Apríl',
    'Máj',
    'Jún',
    'Júl',
    'August',
    'September',
    'Október',
    'November',
    'December',
  ];

  const currentMonth = moment(moment(), 'YYYY/MM/DD').format('M');
  const currentYear = moment(moment(), 'YYYY/MM/DD').format('Y');

  const data = {
    labels: allMonths.slice(0, Number(currentMonth)),
    datasets: [
      {
        label: 'Jedlo',
        data: data1,
        backgroundColor: '#BDBDE7',
        borderRadius: '5',
        fill: true,
      },
      {
        label: 'Ostatné',
        data: data2,
        backgroundColor: '#E1E5EE',
        borderRadius: '5',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        // defining min and max so hiding the dataset does not change scale range
        min: 500,
        max: 4500,
        backdropColor: '#000',
        color: '#E1E5EE',
        ticks: {
          beginAtZero: true,
          stepSize: 1000,
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
    <div className="mt-5">
      <Title title={`Prehľad nákladov za rok ${currentYear}`} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default CatDetailCostChart;
