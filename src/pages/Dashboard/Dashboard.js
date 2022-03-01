import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handler = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div>
      Dashboard
      <button onClick={handler}>Logout</button>
    </div>
  );
};
