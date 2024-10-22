import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Image from '../Image';

export interface PlaceProps {
  _id: string;
  photos: string[];
  title: string;
  address: string;
  price: number;
  description: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  extraInfo: string;
}

export default function IndexPage() {
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get('/places');
        setPlaces(response.data);
      };
      fetchData();
    } catch (error) {
      setRedirect(`/error`);
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
      {places.length > 0 &&
        places.map((place, key) => (
          <Link key={key + place._id} to={'/place/' + place._id}>
            <div className='shadow-xl bg-gray-500 mb-2 rounded-2xl flex'>
              {place.photos?.[0] && (
                <Image
                  className='rounded-2xl object-cover aspect-square'
                  src={place.photos?.[0]}
                  alt=''
                />
              )}
            </div>
            <h2 className='font-bold'>{place.address}</h2>
            <h3 className='text-sm text-gray-500'>{place.title}</h3>
            <div className='mt-1'>
              <span className='font-bold'>${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
