import { useContext, useEffect, useState } from 'react';
import { PlaceProps } from '../pages/IndexPage';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { UserContextType } from '../assets/types';

const BookingWidget = ({ place }: { place: PlaceProps }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<Number | any>();
  const [redirect, setRedirect] = useState('');

  const { user } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='border rounded-2xl mt-4'>
      <div className='flex'>
        <div className='py-3 px-4'>
          <label>Check in: </label>
          <input
            type='date'
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
          />
        </div>
        <div className='py-3 px-4 border-l'>
          <label>Check out: </label>
          <input
            type='date'
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>
      </div>
      <div>
        <div className='py-3 px-4 border-t'>
          <label>Number of guests:</label>
          <input
            type='number'
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(Number(ev.target.value))}
          />
        </div>
        {numberOfNights > 0 && (
          <div className='py-3 px-4 border-t'>
            <label>Your full name:</label>
            <input
              type='text'
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type='number'
              value={phone}
              onChange={(ev) => setPhone(Number(ev.target.value))}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className='primary mt-4'>
        Book this place{' '}
        {numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
