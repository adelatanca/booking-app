import React, { useEffect, useState } from 'react';
import { TextInput } from '../stories/TextInput/TextInput';
import Perks from '../components/Perks';
import PhotosUploader from '../components/PhotosUploader';
import axios from 'axios';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

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
  const [maxGuests, setMaxGuests] = useState<number | string>(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  const savePlace = async (ev: any) => {
    ev.preventDefault();
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
    };

    if (id) {
      await axios.put('/places', {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <TextInput
          id='title-input'
          title='Title'
          description='Title for your place'
          value={title}
          onChange={setTitle}
        />
        <TextInput
          id='address-input'
          title='Address'
          description='Address for your place'
          value={address}
          onChange={setAddress}
        />
        <h2 className='text-2xl mt-4'>Photos</h2>
        <p className='text-gray-500 text-sm'>Photos of your place</p>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
        <p className='text-gray-500 text-sm'>Add check in, check out times</p>
        <div className='grid gap-2 sm:grid-cols-3'>
          <div className='mt-2 -mb-1'>
            <h3>Check in time</h3>
            <input
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              type='text'
              placeholder='14'
            />
          </div>
          <div className='mt-2 -mb-1'>
            <h3>Check out time</h3>
            <input
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type='text'
              placeholder='11'
            />
          </div>
          <div className='mt-2 -mb-1'>
            <h3>Max number of guests</h3>
            <input
              type='number'
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <button className='primary my-4'>Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
