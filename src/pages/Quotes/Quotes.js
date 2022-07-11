import { Text, Title } from '@mantine/core';
import Section from '../../components/Pages/Section';
import { ReactComponent as ComingSoon } from '../../assets/svg/coming-soon.svg';
import useStyles from './Quotes.styles';

export const Quotes = () => {
  const { classes } = useStyles();

  return (
    <Section>
      <div className={classes.comingSoon}>
        <ComingSoon className={classes.comingSoonIcon} />
        <Title className={classes.comingSoonTitle} order={3}>
          Quotes Feature Coming Soon!
        </Title>
        <Text size="lg">
          We will notify you once it's ready, you can also check our progress on{' '}
          <span>
            <a
              className={classes.link}
              href="https://github.com/lancebelarmino/calometer"
              target="_blank"
              rel="noreferrer">
              GitHub.
            </a>
          </span>
        </Text>
      </div>
    </Section>
  );
};
