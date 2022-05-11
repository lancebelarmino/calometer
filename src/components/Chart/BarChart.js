import { Title } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as BarTitle, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import useStyles from './BarChart.styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, BarTitle, Tooltip);

const barColor = () => {
  const activeDay = dayjs().day();

  switch (activeDay) {
    case 0:
      return ['#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#FFC700'];
    case 1:
      return ['#FFC700', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8'];
    case 2:
      return ['#F6ECC8', '#FFC700', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8'];
    case 3:
      return ['#F6ECC8', '#F6ECC8', '#FFC700', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8'];
    case 4:
      return ['#F6ECC8', '#F6ECC8', '#F6ECC8', '#FFC700', '#F6ECC8', '#F6ECC8', '#F6ECC8'];
    case 5:
      return ['#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#FFC700', '#F6ECC8', '#F6ECC8'];
    case 6:
      return ['#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#FFC700', '#F6ECC8'];
    default:
      return ['#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8', '#F6ECC8'];
  }
};

const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      grid: {
        drawBorder: false,
        color: '#E8E8E8',
        // color: '#FFC700',
      },
      ticks: {
        beginAtZero: true,
        stepSize: 500,
        precision: 0,
      },
    },
  },
  maintainAspectRatio: false,
};

const dummy_data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [560, 980, 700, 1600, 1100, 1450, 1450],
      backgroundColor: barColor(),
      borderDash: [10, 10],
    },
  ],
};
const BarChart = ({ data, title }) => {
  const { classes } = useStyles();
  return (
    <div>
      <Title className={classes.title} order={5}>
        {title}
      </Title>
      <div className={classes.chart}>
        <Bar options={options} data={dummy_data} />
      </div>
    </div>
  );
};

export default BarChart;
