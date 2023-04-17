import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const notify = () => toast('Register Successful');

  const registerUser = async (ev: any) => {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      notify();
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
    } catch (e) {
      console.log(e);
      alert('Registration failed. Please try again.');
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input
            type='text'
            placeholder='Your name'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type='email'
            name='email'
            placeholder={'Your email address'}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type='password'
            name='password'
            placeholder={'Your password'}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type='submit' className='shadow-xl primary'>
            Register
          </button>
          <div className='text-center py-2 text-gray-500'>
            Already have an account?{' '}
            <Link className='underline text-black' to={'/login'}>
              {' '}
              Login now
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterPage;
