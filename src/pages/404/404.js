import { Link } from 'react-router-dom';
import { Title, Button } from '@mantine/core';
import Section from '../../components/Pages/Section';
import { ReactComponent as Error } from '../../assets/svg/404.svg';
import useStyles from './404.styles';

export const NotFound = () => {
  const { classes } = useStyles();

  return (
    <Section>
      <div className={classes.error}>
        <Error className={classes.errorIcon} />
        <Title className={classes.errorTitle} order={2}>
          Uh oh... page not found
        </Title>
        <Button className={classes.errorBtn} variant="outline" component={Link} to="/dashboard">
          Go Back
        </Button>
      </div>
    </Section>
  );
};
