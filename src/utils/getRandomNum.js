export default function getRandomNum(arr) {
  let numArr = [];

  for (let i = 0; i < 2; i++) {
    const num = Math.floor(Math.random() * arr.length);
    numArr.push(num);
  }

  return numArr;
}
