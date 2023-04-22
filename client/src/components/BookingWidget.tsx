import { useContext, useEffect, useState } from 'react';
import { PlaceProps } from '../pages/IndexPage';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { UserContextType } from '../assets/types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../stories/TextInput/TextInput';

const BookingWidget = ({ place }: { place: PlaceProps }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<Number | any>();
  const [redirect, setRedirect] = useState('');

  const { user } = useContext(UserContext) as UserContextType;

  const initialValues = {
    phone_number: '',
  };

  const validationSchema = Yup.object().shape({
    phone_number: Yup.string()
      .max(10, 'Max length 10 digits')
      .matches(/^07\d{8}$/, 'Introduce a RO phone number')
      .required('Mobile number is required'),
  });

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
    try {
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
    } catch (e) {
      setRedirect(`/error`);
    }
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
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={bookThisPlace}>
              {({
                values,
                errors,
                touched,
                setTouched,
                setFieldValue,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <TextInput
                    id='mobile-input'
                    type='text'
                    placeholder='Phone number'
                    description='Phone number'
                    value={values.phone_number}
                    onChange={(val) => {
                      setPhone(val);
                      setFieldValue('phone_number', val);
                    }}
                    onBlur={() =>
                      setTouched({ ...touched, phone_number: true })
                    }
                    onFocus={() =>
                      !errors.phone_number &&
                      setTouched({ ...touched, phone_number: false })
                    }
                    error={touched.phone_number && !!errors.phone_number}
                    errorMessage={errors.phone_number}
                  />
                  <button onClick={bookThisPlace} className='primary mt-4'>
                    Book this place{' '}
                    {numberOfNights > 0 && (
                      <span> ${(numberOfNights * place.price).toFixed(2)}</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
