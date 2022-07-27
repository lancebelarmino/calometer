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
    const filteredArr = arr.filter((item) => item !== 0);

    if (filteredArr.length !== 0) {
      const average = filteredArr.reduce((a, b) => a + b, 0) / filteredArr.length;

      return Math.round(average);
    }

    return 0;
  },

  total(arr) {
    if (arr.length !== 0) {
      const total = arr.reduce((a, b) => a + b);

      return Math.round(total);
    }

    return 0;
  },

  highest(arr) {
    const maxValue = Math.max(...arr.flat());

    return Math.round(maxValue);
  },
};

export default getCalories;

export function getTotalCalories(data) {
  const calorieArr = data.map((item) => Number(item.calories));
  const total = getCalories.total(calorieArr);

  return total;
}
