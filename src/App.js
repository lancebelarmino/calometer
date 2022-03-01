import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import PrivateWrapper from './components/Routes/PrivateWrapper';
import LoadingPage from './components/LoadingPage';
import theme from './styles/theme';
import components from './styles/components';
import global from './styles/global';

const Login = lazy(() => import('./routes/Login.js'));
const Register = lazy(() => import('./routes/Register.js'));
const Reset = lazy(() => import('./routes/Reset.js'));
const Dashboard = lazy(() => import('./routes/Dashboard.js'));
const Tracker = lazy(() => import('./routes/Tracker.js'));
const Settings = lazy(() => import('./routes/Settings.js'));

const App = () => {
  return (
    <MantineProvider theme={theme} styles={components} withNormalizeCSS>
      <Global styles={global} />
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />

            <Route element={<PrivateWrapper />}>
              <Route path="/" element={<Navigate to={'/dashboard'} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </MantineProvider>
  );
};

export default App;
