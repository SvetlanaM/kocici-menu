import Title from '../components/title';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Januar', 'Februar', 'Marec', 'April', 'Maj', 'Jun'],
  datasets: [
    {
      label: 'Granule',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: '#BDBDE7',
      borderRadius: '5',
      fill: true,
    },
    {
      label: 'Ostatne',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: '#E1E5EE',
      borderRadius: '5',
      fill: true,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        backdropColor: '#000',
        color: '#E1E5EE',
        stacked: false,
        ticks: {
          beginAtZero: false,
          stepSize: 50,
        },
      },
    ],
    xAxes: [
      {
        backdropColor: '#000',
        color: '#E1E5EE',
        stacked: false,
      },
    ],
  },
};

const CatDetailCostChart = () => {
  return (
    <div className="mt-5">
      <Title title="Prehlad nakladov" />
      <Bar data={data} options={options} />
    </div>
  );
};

export default CatDetailCostChart;
