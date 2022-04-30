import { Title, Text } from '@mantine/core';
import useStyles from './BarChart.styles';

const BarChart = ({ data, title }) => {
  const { classes } = useStyles();
  return (
    <div>
      <Title className={classes.title} order={5}>
        {title}
      </Title>
      <Text>{data}</Text>
    </div>
  );
};

export default BarChart;
