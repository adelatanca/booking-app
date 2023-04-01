import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [user, setUser] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setReady(true);
        console.log('data ', data);
      });
    }
    console.log('ready ', ready);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
