import dayjs from 'dayjs';

function sortByDefault(data) {
  const groupByTime = data.reduce((group, product) => {
    const { time } = product;
    group[time] = group[time] ?? [];
    group[time].push(product);
    return group;
  }, {});

  const sortedBreakfast = groupByTime.breakfast ? groupByTime.breakfast : [];
  const sortedLunch = groupByTime.lunch ? groupByTime.lunch : [];
  const sortedDinner = groupByTime.dinner ? groupByTime.dinner : [];
  const sortedSnacks = groupByTime.snack ? groupByTime.snack : [];

  return [...sortedBreakfast, ...sortedLunch, ...sortedDinner, ...sortedSnacks];
}

export default function toSort(data, type) {
  const defaultData = sortByDefault(data);

  if (type === 'recent') {
    return [...data].sort((a, b) => dayjs(b.date) - dayjs(a.date));
  } else if (type === 'highest') {
    return [...data].sort((a, b) => b.calories - a.calories);
  } else if (type === 'lowest') {
    return [...data].sort((a, b) => a.calories - b.calories);
  }

  return defaultData;
}
