import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { UserContextType } from '../assets/types';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext) as UserContextType;
  let { subpage } = useParams();
  const [redirect, setRedirect] = useState('');

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser('');
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      {!ready && !user ? (
        <div>Loading...</div>
      ) : (
        <div>
          <AccountNav />
          {subpage === 'profile' && (
            <div className='text-center max-w-lg mx-auto'>
              Logged in as {user.name} ({user.email})<br />
              <button
                onClick={() => logout()}
                className='primary max-w-sm mt-2'>
                Logout
              </button>
            </div>
          )}

          {subpage === 'places' && <PlacesPage />}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
