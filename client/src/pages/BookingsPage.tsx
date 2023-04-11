import { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
export interface BookingProps {
  place: String;
  user: String;
  checkIn: Date;
  checkOut: Date;
  name: String;
  phone: String;
  price: Number;
}
const BookingsPage = () => {
  const [bookings, setBookings] = useState<BookingProps[]>([]);

  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <p></p>
            // <div>{booking.checkIn} -> {booking.checkOut} </div>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
