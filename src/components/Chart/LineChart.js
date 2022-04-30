import { Text, Title, Image } from '@mantine/core';
import useStyles from './LineChart.styles';

const LineChart = ({ data, title, subtitle }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.chart}>
      <div>
        <Title className={classes.value} order={4}>
          {data}
        </Title>
        <Text className={classes.title}>{title}</Text>
        <Text className={classes.subtitle} size="xs">
          {subtitle}
        </Text>
      </div>
      <Image width={138} height={58} src={null} withPlaceholder />
    </div>
  );
};

export default LineChart;
