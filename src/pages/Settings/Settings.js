import { Title, Group } from '@mantine/core';
import { motion, LayoutGroup } from 'framer-motion';
import Section from '../../components/Pages/Section';
import SettingsProfile from '../../components/Settings/SettingsProfile';
import SettingsPassword from '../../components/Settings/SettingsPassword';
import SettingsDelete from '../../components/Settings/SettingsDelete';
import useStyles from './Settings.styles';

export const Settings = () => {
  const { classes } = useStyles();

  return (
    <Section>
      <Title className={classes.sectionTitle} order={4}>
        Settings
      </Title>

      <Group position="between" align="flex-start" spacing={40} component={motion.div} layout>
        <SettingsProfile className={classes.profile} />

        <LayoutGroup>
          <motion.div className={classes.leftCol} layout>
            <SettingsPassword className={classes.password} />
            <SettingsDelete />
          </motion.div>
        </LayoutGroup>
      </Group>
    </Section>
  );
};
