import { useEffect, useState } from 'react';
import { TextInput } from '../stories/TextInput/TextInput';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState<String[] | any>([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState<String[]>([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState<number | string | undefined>();
  const [price, setPrice] = useState<number | string | undefined>();
  const [redirect, setRedirect] = useState('');
  const [initialValues, setInitialValues] = useState({
    title: '',
    address: '',
    photos: [],
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: '',
    price: '',
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      axios.get('/places/' + id).then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
        setInitialValues({
          title: data.title,
          address: data.address,
          photos: data.photos,
          description: data.description,
          perks: data.perks,
          extraInfo: data.extraInfo,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          maxGuests: data.maxGuests,
          price: data.price,
        });
      });
    } catch (error) {
      console.error(error);
      setRedirect('/error');
    }
  }, [id]);

  const savePlace = async (ev: any) => {
    //  ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        await axios.put('/places', {
          id,
          ...placeData,
        });
        setRedirect('/account/places');
      } else {
        await axios.post('/places', placeData);
        setRedirect('/account/places');
      }
    } catch (error) {
      console.error(error);
      setRedirect('/error');
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    address: Yup.string().required('Address is required'),
    checkIn: Yup.string()
      .required('Check-in time is required')
      .matches(/^(0[0-9]|1[0-9]|2[0-4])$/, 'Invalid time format'),
    checkOut: Yup.string()
      .required('Check-out time is required')
      .matches(/^(0[0-9]|1[0-9]|2[0-4])$/, 'Invalid time format'),
    maxGuests: Yup.number()
      .min(1, 'Must be greater than or equal to 1')
      .required('Required'),
    price: Yup.number()
      .min(0, 'Must be greater than or equal to 0')
      .positive('Price must be positive')
      .required('Required'),
  });

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={savePlace}>
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
              id='title-input'
              type='text'
              title='Title'
              placeholder='Title'
              description='Title for your place'
              value={values.title}
              onChange={(val) => {
                setTitle(val);
                setFieldValue('title', val);
              }}
              onBlur={() => setTouched({ ...touched, title: true })}
              onFocus={() =>
                !errors.title && setTouched({ ...touched, title: false })
              }
              error={touched.title && !!errors.title}
              errorMessage={errors.title}
            />
            <TextInput
              id='address-input'
              type='text'
              title='Address'
              placeholder='Address'
              description='Address for your place'
              value={values.address}
              onChange={(val) => {
                setAddress(val);
                setFieldValue('address', val);
              }}
              onBlur={() => setTouched({ ...touched, address: true })}
              onFocus={() =>
                !errors.address && setTouched({ ...touched, address: false })
              }
              error={touched.address && !!errors.address}
              errorMessage={errors.address}
            />
            <h2 className='text-2xl mt-4'>Photos</h2>
            <p className='text-gray-500 text-sm'>Photos of your place</p>
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            <h2 className='text-2xl mt-4'>Description</h2>
            <p className='text-gray-500 text-sm'>Description of the place</p>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <h2 className='text-2xl mt-4'>Perks</h2>
            <p className='text-gray-500 text-sm'>
              Select all the perks of your place
            </p>
            <Perks selected={perks} onChange={setPerks} />
            <h2 className='text-2xl mt-4'>Extra info</h2>
            <p className='text-gray-500 text-sm'>
              Things to know about your property
            </p>
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            <h2 className='text-2xl mt-4'>Check in & Check out</h2>
            <p className='text-gray-500 text-sm'>
              Add check in, check out times
            </p>
            <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
              <TextInput
                id='checkin-input'
                type='text'
                title='Check in time'
                placeholder='after 15:00'
                description='Check in time for your place'
                value={values.checkIn}
                onChange={(val) => {
                  setCheckIn(val);
                  setFieldValue('checkIn', val);
                }}
                onBlur={() => setTouched({ ...touched, checkIn: true })}
                onFocus={() =>
                  !errors.checkIn && setTouched({ ...touched, checkIn: false })
                }
                error={touched.checkIn && !!errors.checkIn}
                errorMessage={errors.checkIn}
              />

              <TextInput
                id='checkout-input'
                type='text'
                title='Check out time'
                placeholder='until 11:00'
                description='Check out time for your place'
                value={values.checkOut}
                onChange={(val) => {
                  setCheckOut(val);
                  setFieldValue('checkOut', val);
                }}
                onBlur={() => setTouched({ ...touched, checkOut: true })}
                onFocus={() =>
                  !errors.checkOut &&
                  setTouched({ ...touched, checkOut: false })
                }
                error={touched.checkOut && !!errors.checkOut}
                errorMessage={errors.checkOut}
              />

              <TextInput
                id='maxGuests-input'
                type='text'
                title='Max number of guests'
                description='Introduce your number of guests'
                value={values.maxGuests}
                onChange={(val) => {
                  setMaxGuests(val);
                  setFieldValue('maxGuests', val);
                }}
                onBlur={() => setTouched({ ...touched, maxGuests: true })}
                onFocus={() =>
                  !errors.maxGuests &&
                  setTouched({ ...touched, maxGuests: false })
                }
                error={touched.maxGuests && !!errors.maxGuests}
                errorMessage={errors.maxGuests}
              />

              <TextInput
                id='price-input'
                type='text'
                title='Price per night'
                description='Your price per night'
                value={values.price}
                onChange={(val) => {
                  setPrice(val);
                  setFieldValue('price', val);
                }}
                onBlur={() => setTouched({ ...touched, price: true })}
                onFocus={() =>
                  !errors.price && setTouched({ ...touched, price: true })
                }
                error={touched.price && !!errors.price}
                errorMessage={errors.price}
              />
            </div>
            <div>
              <button type='submit' className='primary my-4'>
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PlacesFormPage;
