import React, { useEffect, useRef, useState } from 'react';
import { Text, Title } from '@mantine/core';
import { Chart as ChartJS, PointElement, LineElement, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Filler } from 'chart.js';
import useStyles from './LineChart.styles';
import getCalories from '../../utils/getCalories';

ChartJS.register(PointElement, LineElement, Filler, ...registerables);

export const options = {
  responsive: true,
  plugins: {
    legend: false,
  },

  layout: {
    padding: {
      top: 12,
      bottom: 12,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.5,
    },
    point: {
      radius: 0,
    },
  },
  tooltips: {
    enabled: false,
  },
  maintainAspectRatio: false,
};

const defaultGradient = ['rgba(255, 185, 156, 1)', 'rgba(255, 255, 255, 0)'];

const createGradient = (canvas, color = defaultGradient) => {
  const gradient = canvas.ctx.createLinearGradient(0, 0, 0, 60);
  gradient.addColorStop(0, color[0]);
  gradient.addColorStop(1, color[1]);

  return gradient;
};

const LineChart = ({ data, title, subtitle, callback, borderColor = '#6ED47C', backgroundColor }) => {
  const [value, setValue] = useState({ calories: 0, arr: [0, 0, 0, 0, 0, 0, 0] });
  const [chartData, setChartData] = useState({ datasets: [] });
  const canvasRef = useRef(null);
  const { classes } = useStyles();

  useEffect(() => {
    const calories = callback(data);
    const arr = getCalories.format(data);

    setValue({ calories, arr });
  }, [callback, data]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      setChartData({
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
          {
            fill: true,
            data: value.arr,
            borderColor: borderColor,
            backgroundColor: createGradient(canvas, backgroundColor),
            pointBackgroundColor: borderColor,
          },
        ],
      });
    }
  }, [backgroundColor, borderColor, value.arr]);

  return (
    <div className={classes.section}>
      <div>
        <Title className={classes.value} order={4}>
          {value.calories}
        </Title>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.subtitle} size="xs">
          {subtitle}
        </Text>
      </div>
      <div className={classes.chart}>
        <Line ref={canvasRef} options={options} data={chartData} />
      </div>
    </div>
  );
};

export default LineChart;
