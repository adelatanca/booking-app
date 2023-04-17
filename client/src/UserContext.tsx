import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const UserContext = createContext({});

export const UserContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [user, setUser] = useState('');
  const [places, setPlaces] = useState('');
  const [bookings, setBookings] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setReady(true);
      });

      axios.get('/places').then(({ data }) => {
        setPlaces(data);
      });

      axios.get('/bookings').then(({ data }) => {
        setBookings(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, ready, places, setPlaces, bookings }}>
      {children}
    </UserContext.Provider>
  );
};
