import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, Global } from '@mantine/core';
import Login from './pages/Login/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import AuthWrapper from './components/AuthWrapper';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Settings from './pages/Settings';
import theme from './styles/theme';
import components from './styles/components';
import global from './styles/global';

const App = () => {
  return (
    <MantineProvider theme={theme} styles={components} withNormalizeCSS>
      <Global styles={global} />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route element={<AuthWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
