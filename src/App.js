import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
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
const Settings = lazy(() => import('./routes/Settings.js'));

const App = () => {
  return (
    <MantineProvider theme={theme} styles={components} withNormalizeCSS>
      <Global styles={global} />
      <AnimatePresence exitBeforeEnter>
        <Suspense key="spinner" fallback={<Spinner />}>
          <Router>
            <Routes>
              <Route element={<PublicWrapper />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset" element={<Reset />} />
              </Route>

              <Route element={<PrivateWrapper />}>
                <Route path="/" element={<Navigate to={'/dashboard'} />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </Suspense>
      </AnimatePresence>
    </MantineProvider>
  );
};

export default App;
