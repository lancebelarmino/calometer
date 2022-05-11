const getCalories = {
  format(arr) {
    if (arr.length < 5) {
      let newArr = [...arr];
      const numOfFill = 5 - arr.length;

      for (let i = 0; i < numOfFill; i++) {
        newArr.unshift(0);
      }

      return newArr;
    }

    return arr;
  },
  average(arr) {
    const formattedArr = getCalories.format(arr);

    return formattedArr.reduce((a, b) => a + b) / arr.length;
  },
  total(arr) {
    const formattedArr = getCalories.format(arr);

    return formattedArr.reduce((a, b) => a + b);
  },
};

export default getCalories;
