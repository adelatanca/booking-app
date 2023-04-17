import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import { BookingProps } from './BookingsPage';
import { useWidth } from '../hooks/useWidth';

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingProps>();
  const windowSize = useWidth();

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(
          ({ _id }: { _id: String }) => _id === id
        );
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return <></>;
  }

  return (
    <div className='my-8'>
      {windowSize > 630 ? (
        <div>
          <h1 className='text-3xl'>{booking.place.title}</h1>
          <AddressLink className='my-2 block'>
            {booking.place.address}
          </AddressLink>
          <div className='bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between'>
            <div>
              <h2 className='text-2xl mb-4'>Your booking information:</h2>
              <BookingDates booking={booking} />
            </div>
            <div className='bg-primary p-6 text-white rounded-2xl'>
              <div>Total price</div>
              <div className='text-3xl'>${booking.price.toString()}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place} />
        </div>
      ) : (
        <div>
          <h1 className='text-2xl'>{booking.place.title}</h1>
          <AddressLink className='my-2 block text-sm'>
            {booking.place.address}
          </AddressLink>
          <div className='flex-column bg-gray-200 p-6 my-6 rounded-2xl items-center justify-between'>
            <div>
              <h2 className='mb-4  font-bold'>Your booking information:</h2>
              <BookingDates booking={booking} />
            </div>
            <div className='text-center mt-4 bg-primary p-2 text-white rounded-2xl '>
              <div className='text-xl'>Total price</div>
              <div className='text-xl'>${booking.price.toString()}</div>
            </div>
          </div>
          <PlaceGallery place={booking.place} />
        </div>
      )}
    </div>
  );
};

export default BookingPage;
