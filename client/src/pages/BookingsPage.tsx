import { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import { PlacesType } from '../assets/types';
import PlaceImage from '../components/PlaceImage';
import { Link, Navigate } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
import { useWidth } from '../hooks/useWidth';

export interface BookingProps {
  _id: string;
  place: PlacesType;
  user: String;
  checkIn: Date;
  checkOut: Date;
  name: String;
  phone: String;
  price: Number;
}
const BookingsPage = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const windowSize = useWidth();
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookings');
        setBookings(response.data);
      } catch (error) {
        setRedirect(`/error`);
      }
    };

    fetchBookings();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking, key) => (
            <div key={`link-${key}`}>
              {windowSize > 630 ? (
                <Link
                  to={`/account/bookings/${booking._id}`}
                  className='mt-4 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden shadow-lg'>
                  <div className='w-48'>
                    <PlaceImage place={booking.place} />
                  </div>
                  <div className='py-3 pr-3 grow'>
                    <h2 className='text-xl'>{booking.place.title}</h2>
                    <div className='text-xl'>
                      <BookingDates
                        booking={booking}
                        className='mb-2 mt-4 text-gray-500'
                      />
                      <div className='flex gap-1'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-8 h-8'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                          />
                        </svg>
                        <span className='text-2xl'>
                          Total price: ${booking.price.toFixed(2).toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  key={`link-${key}`}
                  to={`/account/bookings/${booking._id}`}
                  className='mt-4 flex-column gap-4 bg-gray-200 rounded-2xl overflow-hidden shadow-lg'>
                  <div className='mt-6 bg-gray-400'>
                    <PlaceImage place={booking.place} />
                  </div>
                  <div className='py-3 pr-3 grow bg-gray-200 p-2 rounded-b-xl'>
                    <h2 className='text-xl font-bold'>{booking.place.title}</h2>
                    <div className='text-xl'>
                      <BookingDates
                        booking={booking}
                        className='mb-2 mt-4 text-gray-500'
                      />
                      <div className='flex gap-1 mt-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-8 h-8'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                          />
                        </svg>
                        <span className='text-xl'>
                          Total price: ${booking.price.toFixed(2).toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
