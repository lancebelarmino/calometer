import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Navbar as Nav, Group, Anchor, Burger } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import { ReactComponent as Logo } from '../../assets/svg/logo-sm.svg';
import { ReactComponent as Dashboard } from '../../assets/svg/navbar-dashboard.svg';
import { ReactComponent as Tracker } from '../../assets/svg/navbar-tracker.svg';
import { ReactComponent as Quotes } from '../../assets/svg/navbar-quotes.svg';
import { ReactComponent as Settings } from '../../assets/svg/navbar-settings.svg';
import { ReactComponent as Logout } from '../../assets/svg/navbar-logout.svg';
import toCapitalize from '../../utils/toCapitalize';
import { linkVariant, mobileLinkVariant } from '../../utils/framer-variants';
import useStyles from './Navbar.styles';

const desktopMenu = [
  { icon: Dashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: Tracker, label: 'Tracker', link: '/tracker' },
  { icon: Quotes, label: 'Quotes', link: '/quotes' },
  { icon: Settings, label: 'Settings', link: '/settings' },
];

const mobileMenu = [
  { icon: Dashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: Tracker, label: 'Tracker', link: '/tracker' },
  { icon: Quotes, label: 'Quotes', link: '/quotes' },
  { icon: Settings, label: 'Settings', link: '/settings' },
  { icon: Logout, label: 'Logout', link: null },
];

const Navbar = () => {
  const location = useLocation();
  const { onLogout } = useContext(AuthContext);
  const { classes, cx } = useStyles();
  const [active, setActive] = useState();
  const [opened, setOpened] = useState(false);
  const [desktopOpened, setDesktopOpened] = useState(false);
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isSmallScreen = useMediaQuery('(max-height: 620px)');

  const path = location.pathname.split('/').pop();
  const currentPage = toCapitalize(path);

  const desktopLinks = desktopMenu.map((item) => (
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      component={Link}
      to={item.link}
      key={item.label}
      onClick={(e) => {
        setActive(item.label);
      }}>
      <item.icon className={classes.linkIcon} />
      <AnimatePresence exitBeforeEnter>
        {desktopOpened && (
          <motion.span key={item.label} initial="hidden" animate="visible" exit="exit" variants={linkVariant}>
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Anchor>
  ));

  const mobileLinks = mobileMenu.map((item) => (
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      component={Link}
      to={item.link !== null && item.link}
      key={item.label}
      {...(item.label === 'Logout'
        ? { onClick: onLogout }
        : {
            onClick: () => {
              setActive(item.label);
              setOpened(false);
            },
          })}>
      <item.icon className={classes.linkIcon} />
      <span key={item.label}>{item.label}</span>
    </Anchor>
  ));

  useEffect(() => {
    setActive(currentPage);
  }, [currentPage]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isTablet || isSmallScreen ? (
        <Nav className={cx(classes.mobileNav, { [classes.mobileNavOpened]: opened })}>
          <Nav.Section className={classes.mobileHeader}>
            <Logo className={classes.logo} />
            <Burger
              className={classes.mobileBurger}
              color="#9C9C9E"
              size={20}
              opened={opened}
              onClick={() => setOpened((o) => !o)}
            />
          </Nav.Section>
          <AnimatePresence exitBeforeEnter>
            {opened && (
              <Nav.Section
                className={classes.mobileMenu}
                component={motion.div}
                key="mobile-menu"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileLinkVariant}>
                {mobileLinks}
              </Nav.Section>
            )}
          </AnimatePresence>
        </Nav>
      ) : (
        <Nav className={cx(classes.nav, { [classes.navClosed]: !desktopOpened })}>
          <Nav.Section className={classes.header}>
            <Logo className={classes.logo} />
            <Burger
              className={classes.desktopBurger}
              color="#9C9C9E"
              size={20}
              opened={desktopOpened}
              onClick={() => setDesktopOpened((o) => !o)}
            />
          </Nav.Section>

          <Nav.Section>
            <Group direction="column">{desktopLinks}</Group>
          </Nav.Section>

          <Nav.Section className={classes.footer}>
            <Anchor className={classes.link} onClick={onLogout}>
              <Logout className={classes.linkIcon} />
              <AnimatePresence exitBeforeEnter>
                {desktopOpened && (
                  <motion.span key={'logout'} initial="hidden" animate="visible" exit="exit" variants={linkVariant}>
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </Anchor>
          </Nav.Section>
        </Nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
