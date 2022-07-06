const getCalories = {
  format(arr) {
    if (arr.length < 7) {
      let newArr = [...arr];
      const numOfFill = 7 - arr.length;

      for (let i = 0; i < numOfFill; i++) {
        newArr.unshift(0);
      }

      return newArr;
    }

    return arr;
  },

  average(arr) {
    const formattedArr = getCalories.format(arr);
    const average = formattedArr.reduce((a, b) => a + b, 0) / arr.length;

    return Math.round(average);
  },

  total(arr) {
    const formattedArr = getCalories.format(arr);
    const total = formattedArr.reduce((a, b) => a + b);

    return Math.round(total);
  },

  highest(arr) {
    const formattedArr = getCalories.format(arr);
    const maxValue = Math.max(...formattedArr);
    const maxIndex = formattedArr.indexOf(maxValue);
    const highest = formattedArr[maxIndex];

    return Math.round(highest);
  },
};

export default getCalories;

export function getTotalCalories(data) {
  const calorieArr = data.map((item) => Number(item.calories));
  const total = getCalories.total(calorieArr);

  return total;
}
