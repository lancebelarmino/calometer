import { Link } from 'react-router-dom';
import { Text, Title, Button, Image, Group, UnstyledButton } from '@mantine/core';
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

const dummy_data = {
  weeklyReport: [560, 980, 700, 1600, 1100, 1450],
  aveCalories: [560, 980, 700, 1600, 1100, 1450],
  totalCalories: 2500,
  recentlyAdded: [
    { food: 'Banana Cake', amount: '3 slices', calories: '500', time: 'Dinner' },
    { food: 'Apple Cake', amount: '2 slices', calories: '400', time: 'Lunch' },
    { food: 'Mango Cake', amount: '1 slices', calories: '300', time: 'Breakfast' },
  ],
  profile: [
    { label: 'Age', value: 21, icon: Age },
    { label: 'Height', value: `7'11`, icon: Height },
    { label: 'Weight', value: '64', icon: Weight },
  ],
  quotes: [
    { author: 'April RaQuel', quote: 'A lighter diet, frequent exercise and adequate sleep/rest.' },
    { author: 'April RaQuel', quote: 'A lighter diet, frequent exercise and adequate sleep/rest.' },
  ],
};

export const Dashboard = () => {
  const { classes } = useStyles();

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

  const profileData = dummy_data.profile.map((data) => (
    <Card key={data.label} className={classes.profileCard}>
      <Group position="apart">
        <div>
          <Text className={classes.profileAge}>{data.label}</Text>
          <Title order={5}>
            {data.value} {data.label === 'Height' ? 'ft' : data.label === 'Weight' ? 'lbs' : 'yrs'}
          </Title>
        </div>
        <div className={classes.profileIcon}>
          <data.icon />
        </div>
      </Group>
    </Card>
  ));

  const quoteData = dummy_data.quotes.map((data, index) => (
    <div key={index} className={classes.quoteItem}>
      <Title className={classes.quoteContent} order={6}>
        {data.quote}
      </Title>
      <Text size="sm">- {data.author}</Text>
    </div>
  ));

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
          <Card className={classes.statsItem1}>
            <BarChart data="Content Here" title="Weekly Report" />
          </Card>

          <Card className={classes.statsItem2}>
            <LineChart data="1200 cal" title="Average Calories" subtitle="Per Day" />
          </Card>

          <Card className={classes.statsItem3}>
            <LineChart data="2,500 cal" title="Total Calories" subtitle="Today" />
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
          <UnstyledButton>
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

        <div className={classes.profileDetails}>{profileData}</div>

        <div>
          <Group className={classes.quoteHeader} position="apart">
            <Title order={5}>Quotes</Title>
            <UnstyledButton>
              <Shuffle className={classes.icon} />
            </UnstyledButton>
          </Group>

          <div>{quoteData}</div>
        </div>
      </Section>
    </div>
  );
};
