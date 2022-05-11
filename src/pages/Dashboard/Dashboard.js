import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Text, Title, Button, Image, Group, UnstyledButton } from '@mantine/core';
import dayjs from 'dayjs';
import Section from '../../components/Pages/Section';
import Card from '../../components/Pages/Card';
import BarChart from '../../components/Chart/BarChart';
import LineChart from '../../components/Chart/LineChart';
import Meal from '../../components/Pages/Meal';
import { ReactComponent as Edit } from '../../assets/svg/dashboard-edit.svg';
import { ReactComponent as Age } from '../../assets/svg/dashboard-age.svg';
import { ReactComponent as Height } from '../../assets/svg/dashboard-height.svg';
import { ReactComponent as Weight } from '../../assets/svg/dashboard-weight.svg';
import { ReactComponent as Shuffle } from '../../assets/svg/dashboard-shuffle.svg';
import useStyles from './Dashboard.styles';
import getCalories from '../../utils/getCalories';

const dummy_data = {
  weeklyReport: [560, 980, 700, 1600, 1100, 1450],
  aveCalories: [560, 980, 700, 1600, 1100, 1450],
  totalCalories: [560, 980, 700, 1600],
  recentlyAdded: [
    { food: 'Banana Cake', amount: '3 slices', calories: '500', time: 'Dinner' },
    { food: 'Apple Cake', amount: '2 slices', calories: '400', time: 'Lunch' },
    { food: 'Mango Cake', amount: '1 slices', calories: '300', time: 'Breakfast' },
  ],
  profile: {
    birthday: '1999-05-14',
    weight: `200`,
    weightUnit: 'lbs',
    height: `7'11"`,
    heightUnit: 'ft',
  },
  quotes: [
    { author: 'April RaQuel', quote: 'A lighter diet, frequent exercise and adequate sleep/rest.' },
    { author: 'April RaQuel', quote: 'A lighter diet, frequent exercise and adequate sleep/rest.' },
  ],
};

const getRandomNum = (arr) => {
  let numArr = [];

  for (let i = 0; i < 2; i++) {
    const num = Math.floor(Math.random() * arr.length);
    numArr.push(num);
  }

  return numArr;
};

export const Dashboard = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const { classes, cx } = useStyles();

  const currentDate = dayjs().format('DD/MM/YYYY');

  const randomQuoteHandler = useCallback(() => {
    const index = getRandomNum(quotesData);
    setQuotes([quotesData[index[0]], quotesData[index[1]]]);
  }, [quotesData]);

  const mealsData = dummy_data.recentlyAdded.map((data) => (
    <tr key={data.food}>
      <td>{data.food}</td>
      <td>{data.amount}</td>
      <td>{data.calories}</td>
      <td>
        <Meal data={data.time} />
      </td>
    </tr>
  ));

  const quoteData = quotes.map((data, index) => (
    <div key={index} className={classes.quoteItem}>
      <Title className={classes.quoteContent} order={6}>
        {data.text}
      </Title>
      <Text size="sm">- {data.author ? data.author : 'Anonymous'}</Text>
    </div>
  ));

  useEffect(() => {
    (async function getQuotes() {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      const index = getRandomNum(data);

      setQuotesData(data);
      setQuotes([data[index[0]], data[index[1]]]);
    })();
  }, []);

  return (
    <div className={classes.dashboard}>
      <Section className={classes.dashboardColLeft}>
        <div className={classes.header}>
          <Text className={classes.headerOverline} size="md">
            Welcome back, Lance
          </Text>
          <div className={classes.headerTitle}>
            <Title order={2}>Work hard in silence.</Title>
            <Title order={2}>Let success be your noise.</Title>
          </div>
          <Button component={Link} to="/tracker">
            Start Tracking
          </Button>
        </div>

        <div className={classes.stats}>
          <Card className={classes.statsBar}>
            <BarChart data="Content Here" title="Weekly Report" />
          </Card>

          <Card className={classes.statsLine}>
            <LineChart
              data={dummy_data.aveCalories}
              title="Average Calories"
              subtitle="Per Day"
              callback={getCalories.average}
              borderColor="#FF743C"
              backgroundColor={['rgba(255, 116, 60, 0.6)', 'rgba(255, 116, 60, 0.01)']}
            />
          </Card>

          <Card className={classes.statsLine}>
            <LineChart
              data={dummy_data.totalCalories}
              title="Total Calories"
              subtitle="Today"
              callback={getCalories.total}
              borderColor="#D5E155"
              backgroundColor={['rgba(213, 225, 85, 0.6)', 'rgba(213, 225, 85, 0.01)']}
            />
          </Card>
        </div>

        <div>
          <Title className={classes.mealsTitle} order={5}>
            Recently Added
          </Title>
          <table className={classes.table}>
            <thead className={classes.thead}>
              <tr>
                <th className={classes.thFood}>Food</th>
                <th>Amount</th>
                <th>Calories</th>
                <th className={classes.thTime}>Time</th>
              </tr>
            </thead>
            <tbody className={classes.tbody}>{mealsData}</tbody>
          </table>
        </div>
      </Section>

      <div className={classes.divider} />

      <Section className={classes.dashboardColRight}>
        <div className={classes.profileEdit}>
          <UnstyledButton component={Link} to="/settings">
            <Edit className={classes.icon} />
          </UnstyledButton>
        </div>

        <div className={classes.profileHeader}>
          <Image
            className={classes.profileAvatar}
            width={120}
            height={120}
            radius="50%"
            src="https://images.unsplash.com/photo-1651151925744-eb3a82fa0cbc"
          />
          <Title order={4}>John Doe</Title>
        </div>

        <div className={classes.profileDetails}>
          <Card className={classes.profileCard}>
            <Group position="apart">
              <div>
                <Text className={classes.profileLabel}>Age</Text>
                <Title order={5}>{dayjs(currentDate).diff(dummy_data.profile.birthday, 'year')} yrs</Title>
              </div>
              <div className={cx(classes.profileIcon, classes.profileLime)}>
                <Age />
              </div>
            </Group>
          </Card>

          <Card className={classes.profileCard}>
            <Group position="apart">
              <div>
                <Text className={classes.profileLabel}>Height</Text>
                <Title order={5}>
                  {dummy_data.profile.height} {dummy_data.profile.heightUnit}
                </Title>
              </div>
              <div className={cx(classes.profileIcon, classes.profileOrange)}>
                <Height />
              </div>
            </Group>
          </Card>

          <Card className={classes.profileCard}>
            <Group position="apart">
              <div>
                <Text className={classes.profileLabel}>Weight</Text>
                <Title order={5}>
                  {dummy_data.profile.weight} {dummy_data.profile.weightUnit}
                </Title>
              </div>
              <div className={cx(classes.profileIcon, classes.profileYellow)}>
                <Weight />
              </div>
            </Group>
          </Card>
        </div>

        <div>
          <Group className={classes.quoteHeader} position="apart">
            <Title order={5}>Quotes</Title>
            <UnstyledButton onClick={randomQuoteHandler}>
              <Shuffle className={classes.icon} />
            </UnstyledButton>
          </Group>

          <div>{quotes && quoteData}</div>
        </div>
      </Section>
    </div>
  );
};
