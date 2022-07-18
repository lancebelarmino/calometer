import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Text, Title, Button, Avatar, Group, UnstyledButton } from '@mantine/core';
import dayjs from 'dayjs';
import AuthContext from '../../context/AuthContext';
import useBoard from '../../hooks/useBoard';
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
import getCalories from '../../utils/getCalories';
import getRandomNum from '../../utils/getRandomNum';
import getRecentItems from '../../utils/getRecentItems';
import { getLocalItem } from '../../utils/localStorage';
import useStyles from './Dashboard.styles';

export const Dashboard = () => {
  const { userData } = useContext(AuthContext);
  const { statsData } = useBoard();

  const [quotesData, setQuotesData] = useState([]);
  const [quote, setQuote] = useState(null);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [profilePicture] = useState(() => {
    const profilePicture = getLocalItem('profile_picture');

    if (profilePicture) {
      return {
        image: null,
        url: profilePicture.url,
        defaultColor: profilePicture.defaultColor,
        initials: profilePicture.initials,
      };
    }

    return { image: null, url: null, defaultColor: null, initials: null };
  });
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { classes, cx } = useStyles();

  const isUserDataLoaded = userData !== null;

  const currentDate = dayjs().format('YYYY-MM-DD');

  const randomQuoteHandler = useCallback(() => {
    const index = getRandomNum(quotesData);
    setQuote(quotesData[index[0]]);
  }, [quotesData]);

  const mealsData = recentlyAdded.map((data) => (
    <tr key={data.id}>
      <td>{data.food}</td>
      <td>{data.amount}</td>
      <td>{data.calories}</td>
      <td>
        <Meal data={data.time} />
      </td>
    </tr>
  ));

  useEffect(() => {
    if (isFirstRender === true) {
      (async function getQuotes() {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();
        const index = getRandomNum(data);
        setQuotesData(data);
        setQuote(data[index[0]]);
      })();
    }

    setIsFirstRender(false);
  }, [isFirstRender]);

  useEffect(() => {
    if (isUserDataLoaded) {
      if (userData.boards !== undefined) {
        const recentItems = getRecentItems(userData.boards);
        setRecentlyAdded(recentItems);
      }
    }
  }, [isUserDataLoaded, userData]);

  return (
    <div className={classes.dashboard}>
      <Section className={classes.dashboardColLeft}>
        <div className={classes.header}>
          <Text className={classes.headerOverline} size="md">
            Welcome back {userData ? `, ${userData.firstName}` : ''}
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
            <BarChart data={statsData.averageCaloriesPerDay} title="Weekly Report" />
          </Card>

          <Card className={classes.statsLine}>
            <LineChart
              data={statsData.averageCaloriesPerDay}
              title="Average Calories"
              subtitle="Per Day"
              callback={getCalories.average}
              borderColor="#FF743C"
              backgroundColor={['rgba(255, 116, 60, 0.6)', 'rgba(255, 116, 60, 0.01)']}
            />
          </Card>

          <Card className={classes.statsLine}>
            <LineChart
              data={statsData.totalCaloriesToday}
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
            <tbody className={classes.tbody}>
              {mealsData.length !== 0 ? (
                mealsData
              ) : (
                <tr>
                  <td>No items.</td>
                </tr>
              )}
            </tbody>
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
          <Avatar
            className={classes.profileAvatar}
            src={profilePicture.url}
            alt={profilePicture.initials}
            size={100}
            radius={100}
            color={profilePicture.defaultColor}>
            {profilePicture.initials}
          </Avatar>
          <Title order={4}>{isUserDataLoaded ? `${userData.firstName} ${userData.lastName}` : ''}</Title>
        </div>

        <div className={classes.profileDetails}>
          <Card className={classes.profileCard}>
            <Group position="apart">
              <div>
                <Text className={classes.profileLabel}>Age</Text>
                <Title order={5}>
                  {isUserDataLoaded ? dayjs(currentDate).diff(userData.profile.birthday, 'year') : '0'} yrs
                </Title>
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
                  {isUserDataLoaded ? `${userData.profile.height} ${userData.profile.heightUnit}` : '0 ft'}
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
                  {isUserDataLoaded ? `${userData.profile.weight} ${userData.profile.weightUnit}` : '0 kg'}
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
            <Title order={5}>Quote</Title>
            <UnstyledButton onClick={randomQuoteHandler}>
              <Shuffle className={classes.icon} />
            </UnstyledButton>
          </Group>

          {quote !== null && (
            <div className={classes.quoteItem}>
              <Title className={classes.quoteContent} order={6}>
                {quote.text}
              </Title>
              <Text size="sm">- {quote.author ? quote.author : 'Anonymous'}</Text>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};
