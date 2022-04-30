import useStyles from './Meal.styles';

const Meal = ({ data }) => {
  const { classes, cx } = useStyles();

  const mealClass = data.toLowerCase();

  return <div className={cx(classes.meal, classes[mealClass])}>{data}</div>;
};

export default Meal;
