import { Title } from '@mantine/core';
import { ReactComponent as Logo } from '../../assets/svg/logo-lg.svg';
import useStyles from './FormSection.styles';

const FormSection = ({ children, title }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.section}>
      <div className={classes.wrapper}>
        <Logo className={classes.logo} />
        <Title className={classes.title} order={4}>
          {title}
        </Title>
        {children}
      </div>
    </div>
  );
};

export default FormSection;
