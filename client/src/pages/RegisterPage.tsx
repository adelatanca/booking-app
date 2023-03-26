import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (ev: any) => {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration succesful. Now you can log in.');
    } catch (e) {
      console.log(e);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input
            type='text'
            placeholder='Adela Tanca'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type='email'
            name='email'
            placeholder={'your email address'}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type='password'
            name='password'
            placeholder={'your password'}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type='submit' className='primary'>
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
      </div>
    </div>
  );
};

export default RegisterPage;
