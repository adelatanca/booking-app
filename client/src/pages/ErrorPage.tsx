import SearchWindow from '../assets/icon-round-search-window.svg';
import { useWidth } from '../hooks/useWidth';

export const ErrorPage = () => {
  const windowSize = useWidth();
  return (
    <div className='mt-8'>
      {windowSize > 630 && (
        <div className='flex flex-col items-center justify-center h-full'>
          <img src={SearchWindow} alt='error-img' className='mb-8' />
          <div className='text-center'>
            <div className='font-bold text-3xl mt-4 text-red-400'>
              Sorry, something's gone wrong. It's not your fault, it's ours.
            </div>
            <div className='mt-4 font-bold text-xl text-red-500'>
              Please, try again later!
            </div>
          </div>
        </div>
      )}
      {windowSize < 630 && (
        <>
          <img src={SearchWindow} alt='error-img' className='ml-20' />
          <div className='font-bold text-3xl mt-4 text-red-400'>
            Sorry, something's gone wrong. It's not your fault, it's ours.
          </div>
          <div className='mt-4 font-bold text-xl text-red-500'>
            Please, try again later!
          </div>
        </>
      )}
    </div>
  );
};
