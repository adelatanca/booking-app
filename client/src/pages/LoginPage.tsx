import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext<any>(UserContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert('Login Successful');
      setRedirect(true);
    } catch (e) {
      console.log(e);
      alert('Login failed');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder={'your email address'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            placeholder={'your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='primary'>
            Login
          </button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet?{' '}
            <Link className='underline text-black' to={'/register'}>
              {' '}
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
