import Title from '../components/title';
import { Bar } from 'react-chartjs-2';

interface CatDetailCostChartProps {
  data1: number[];
  data2: number[];
}

const CatDetailCostChart = ({ data1, data2 }: CatDetailCostChartProps) => {
  const mergeData = [...data1, ...data2];

  const data = {
    labels: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Jun'],
    datasets: [
      {
        label: 'Granule',
        data: data1,
        backgroundColor: '#BDBDE7',
        borderRadius: '5',
        fill: true,
      },
      {
        label: 'Ostatne',
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
        min: Math.floor(Math.min.apply(Math, mergeData) / 10) * 10 - 500,
        max: Math.floor(Math.max.apply(Math, mergeData) / 10) * 10,
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
      <Title title="Prehlad nakladov" />
      <Bar data={data} options={options} />
    </div>
  );
};

export default CatDetailCostChart;
