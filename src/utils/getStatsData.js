import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';
import getCalories from '../utils/getCalories';

export default function getStatsData(data) {
  /**
   * Data for new users
   */
  if (data === undefined) {
    const averageCaloriesPerDay = getCalories.format([0]);
    const totalCaloriesToday = getCalories.format([0]);
    const highestCalorie = getCalories.format([0]);

    return { averageCaloriesPerDay, totalCaloriesToday, highestCalorie };
  }

  dayjs.extend(weekday);
  dayjs.extend(isBetween);

  const currentDay = dayjs().format();
  const lastSunday = dayjs().weekday(0).format();

  const boardsThisWeek = data.filter((board) => dayjs(board.date).isBetween(currentDay, lastSunday));

  const getWeeklyCalories = () => {
    let calories = [[], [], [], [], [], [], []];

    for (let i = 0; i <= boardsThisWeek.length - 1; i++) {
      let dailyCalories = [];
      const day = dayjs(boardsThisWeek[i].date).day();

      if (boardsThisWeek[i].board_items !== undefined) {
        boardsThisWeek[i].board_items.forEach((item) => dailyCalories.push(item.calories));
        calories[day] = dailyCalories;
      }
    }

    return calories;
  };

  const caloriesPerBoard = getWeeklyCalories();

  /**
   * Average Calories Per Day This Week
   */
  const averageCaloriesPerDay = caloriesPerBoard.map((item, index) => {
    if (item.length !== 0) {
      return getCalories.total(item);
    }
    return 0;
  });

  /**
   * Highest Calories
   */
  const caloriesThisWeek = caloriesPerBoard.flat();
  const highestCalorie = getCalories.format(caloriesThisWeek);

  /**
   * Format as YYYY-MM-DD to compare the day and ignore time
   */
  const boardToday = data.filter(
    (board) => dayjs(board.date).format('YYYY-MM-DD') === dayjs(currentDay).format('YYYY-MM-DD')
  );

  /**
   * Total Calories Today
   */
  //
  const hasBoardToday = boardToday.length !== 0 && boardToday[0].board_items !== undefined;
  const caloriesToday = hasBoardToday ? boardToday[0].board_items.map((item) => item.calories) : [0];
  const totalCaloriesToday = getCalories.format(caloriesToday);

  return {
    averageCaloriesPerDay,
    totalCaloriesToday,
    highestCalorie,
  };
}
