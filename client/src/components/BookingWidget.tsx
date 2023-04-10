import { PlaceProps } from '../pages/IndexPage';

const BookingWidget = ({ place }: { place: PlaceProps }) => {
  return (
    <div className='border rounded-2xl mt-4'>
      <div className='flex'>
        <div className='py-3 px-4'>
          <label>Check in: </label>
          <input type='date' />
        </div>
        <div className='py-3 px-4 border-l'>
          <label>Check out: </label>
          <input type='date' />
        </div>
      </div>
      <div>
        <div className='py-3 px-4 border-t'>
          <label>Number of guests:</label>
          <input type='number' value={1} />
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
