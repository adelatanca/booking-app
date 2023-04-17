import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext<any>(UserContext);

  const notify = () => toast('Login Successful');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      notify();
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
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
          <button type='submit' className='shadow-xl primary'>
            Login
          </button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet?{' '}
            <Link className='underline text-black shadow-xl' to={'/register'}>
              {' '}
              Register now
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
