import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { 
  signInStart, 
  signInSuccess, 
  signInFailure 
} from '../redux/user/userslice';
import {useDispatch, useSelector} from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // If the response is not OK, throw an error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await res.json();
      console.log("Signin Successful:", data);
      if (data.success === false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
      console.error("Signin Error:", error.message);
    }
  };
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' id='email' className='bg-slate-100 
        p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 
        p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg 
        p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
      </form> 
      <div className='flex gap-2 mt-4'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
        <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>

    <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ""}</p>

    </div>
  )
}
