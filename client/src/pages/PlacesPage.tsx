import AccountNav from '../components/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { PlacesType } from '../assets/types';
import PlaceImage from '../components/PlaceImage';

const PlacesPage = () => {
  const [places, setPlaces] = useState<PlacesType[]>([]);
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    try {
      axios.get('/user-places').then(({ data }) => {
        setPlaces(data);
      });
    } catch (error) {
      console.error(error);
      setRedirect('/error');
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <br />
        <Link
          className='shadow-xl inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'
          to={'/account/places/new'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className='mt-4'>
        {places.length > 0 &&
          places.map((place, key) => (
            <Link
              key={`${key}-${place._id}`}
              to={'/account/places/' + place._id}
              className='shadow-xl mb-4 flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl'>
              <div className='flex w-32 h-32 bg-gray-300 grow-0 shrink-0'>
                <PlaceImage place={place} />
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title} </h2>
                <p className='text-lg mt-2'>{place.description}</p>
                <p className='text-sm mt-3'>{place.extraInfo}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
