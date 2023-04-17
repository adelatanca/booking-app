import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PlaceProps } from './IndexPage';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState<PlaceProps>();
  const [redirect, setRedirect] = useState('');

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`/places/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error('Error fetching place:', error);
        // handle error and redirect
        setRedirect('/error');
      }
    };
    if (id) {
      fetchPlace();
    }
  }, [id]);

  if (!place) return <div></div>;

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
          <div className='my-4'>
            <h2 className='font-semibold text-2xl'>Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className='bg-white -mx-8 px-8 py-8 border-t'>
        <div>
          <h2 className='font-semibold text-2xl'>Extra info</h2>
        </div>
        <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
