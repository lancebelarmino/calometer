import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export const Dashboard = () => {
  const { onLogout } = useContext(AuthContext);

  const handler = () => {
    onLogout();
  };

  return (
    <div>
      Dashboard
      <button onClick={handler}>Logout</button>
    </div>
  );
};
