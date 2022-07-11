import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import { AuthContextProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import NavbarSection from './components/Navbar/NavbarSection';
import PublicWrapper from './components/Routes/PublicWrapper';
import PrivateWrapper from './components/Routes/PrivateWrapper';
import Spinner from './components/Spinner/Spinner';
import theme from './styles/theme';
import components from './styles/components';
import global from './styles/global';

const Login = lazy(() => import('./routes/Login.js'));
const Register = lazy(() => import('./routes/Register.js'));
const Reset = lazy(() => import('./routes/Reset.js'));
const Onboarding = lazy(() => import('./routes/Onboarding.js'));
const Dashboard = lazy(() => import('./routes/Dashboard.js'));
const Tracker = lazy(() => import('./routes/Tracker.js'));
const Quotes = lazy(() => import('./routes/Quotes.js'));
const Settings = lazy(() => import('./routes/Settings.js'));

const App = () => {
  const location = useLocation();

  return (
    <MantineProvider theme={theme} styles={components} withNormalizeCSS>
      <Global styles={global} />
      <AuthContextProvider>
        <Suspense key="spinner" fallback={<Spinner />}>
          <NavbarSection>
            {/* <AnimatePresence exitBeforeEnter> */}
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<Navigate to={'/login'} />} />

              <Route element={<PublicWrapper />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset" element={<Reset />} />
              </Route>

              <Route element={<PrivateWrapper />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/onboarding" element={<Onboarding />} />
              </Route>
            </Routes>
            {/* </AnimatePresence> */}
          </NavbarSection>
        </Suspense>
      </AuthContextProvider>
    </MantineProvider>
  );
};

export default App;
