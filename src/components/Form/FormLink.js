import { Link } from 'react-router-dom';
import { Anchor } from '@mantine/core';
import useStyles from './FormLink.styles';

const FormLink = ({ message, highlight, link }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.message}>
      <Anchor component={Link} to={link}>
        {message}
        <span className={classes.highlight}> {highlight}</span>
      </Anchor>
    </div>
  );
};

export default FormLink;
