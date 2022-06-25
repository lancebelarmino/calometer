import dayjs from 'dayjs';

export default function getFormattedDate(date) {
  const formattedDate = {
    dayMonth: `${dayjs(date).format('MMM')} ${dayjs(date).format('D')}`,
    dayWeek: dayjs(date).format('dddd'),
  };

  return formattedDate;
}
