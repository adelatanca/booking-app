import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TextInput } from '../stories/TextInput/TextInput';
import Checkbox from '../stories/Checkbox/Checkbox';

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link
            className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full'
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
      )}

      {action === 'new' && (
        <div>
          <form>
            <TextInput
              id='title-input'
              title='Title'
              description='Title for your place'
            />
            <TextInput
              id='address-input'
              title='Address'
              description='Address for your place'
            />
            <h2 className='text-2xl mt-4'>Photos</h2>
            <p className='text-gray-500 text-sm'>Photos of your place</p>
            <div className='flex gap-2'>
              <input type='text' placeholder='Add using a link ...jpg' />
              <button className='bg-gray-200 px-4 rounded-2xl'>
                Add&nbsp;photo
              </button>
            </div>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6'>
              <button className='flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
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
                    d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                  />
                </svg>
                Upload
              </button>
            </div>
            <h2 className='text-2xl mt-4'>Description</h2>
            <p className='text-gray-500 text-sm'>Description of the place</p>
            <textarea />
            <h2 className='text-2xl mt-4'>Perks</h2>
            <p className='text-gray-500 text-sm'>
              Select all the perks of your place
            </p>
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
              <Checkbox id='wi-fi' perk='WI-FI'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z'
                  />
                </svg>
              </Checkbox>
              <Checkbox id='free-parking' perk='Free parking'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                  />
                </svg>
              </Checkbox>
              <Checkbox id='tv' perk='TV'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z'
                  />
                </svg>
              </Checkbox>
              <Checkbox id='pets' perk='Pets'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
                  />
                </svg>
              </Checkbox>
              <Checkbox id='private-entrance' perk='Private entrance'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                  />
                </svg>
              </Checkbox>
            </div>
            <h2 className='text-2xl mt-4'>Extra info</h2>
            <p className='text-gray-500 text-sm'>
              Things to know about your property
            </p>
            <textarea />
            <h2 className='text-2xl mt-4'>Check in & Check out</h2>
            <p className='text-gray-500 text-sm'>
              Add check in, check out times
            </p>
            <div className='grid gap-2 sm:grid-cols-3'>
              <div className='mt-2 -mb-1'>
                <h3>Check in time</h3>
                <input type='text' placeholder='14:00' />
              </div>
              <div className='mt-2 -mb-1'>
                <h3>Check out time</h3>
                <input type='text' />
              </div>
              <div className='mt-2 -mb-1'>
                <h3>Max number of guests</h3>
                <input type='text' />
              </div>
            </div>
            <div>
              <button className='primary my-4'>Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
