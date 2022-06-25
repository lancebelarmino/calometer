import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';
import getCalories from '../utils/getCalories';

export default function getStatsData(data) {
  dayjs.extend(weekday);
  dayjs.extend(isBetween);

  const currentDay = dayjs().format();
  const lastSunday = dayjs().weekday(-7).format();

  const boardsThisWeek = data.filter((board) => dayjs(board.date).isBetween(currentDay, lastSunday));
  // Format as YYYY-MM-DD to compare the day and ignore time
  const boardToday = data.filter(
    (board) => dayjs(board.date).format('YYYY-MM-DD') === dayjs(currentDay).format('YYYY-MM-DD')
  );
  const caloriesPerBoard = boardsThisWeek.map((board) => {
    let calories = [];
    if (board.board_items !== undefined) {
      board.board_items.forEach((item) => calories.push(item.calories));
    }
    return calories;
  });

  // Average Calories Per Day This Week
  const averageCaloriesPerDay = caloriesPerBoard.map((item) => getCalories.total(item));

  // Total Calories Today
  const hasBoardToday = boardToday.length !== 0 && boardToday[0].board_items !== undefined;
  const caloriesToday = hasBoardToday ? boardToday[0].board_items.map((item) => item.calories) : [0];
  const totalCaloriesToday = getCalories.format(caloriesToday);

  // Highest Calories
  const caloriesThisWeek = caloriesPerBoard.flat();
  const highestCalorie = getCalories.format(caloriesThisWeek);

  return {
    averageCaloriesPerDay,
    totalCaloriesToday,
    highestCalorie,
  };
}
