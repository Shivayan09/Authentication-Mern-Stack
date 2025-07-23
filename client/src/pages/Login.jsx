import React, { useContext, useState } from 'react'
import { assets } from '../assets/asset'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();

    const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext);

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
            if(state==='Sign Up') {
                const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})
                if(data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})
                if(data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch(err) {
            toast.error(err.message)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-0 md:px-6 bg-[url("/bg_img.png")]'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="" className='absolute left-5 top-5 w-32 md:w-28 cursor-pointer' />
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-[100%]] text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create account' : 'Login'}</h2>
                <p className='text-md text-center mb-3'>{state === 'Sign Up' ? 'Create your account' : 'Log In to your account'}</p>
                <form  onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className='mb-4 flex text-white items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
                            <img src={assets.person_icon} alt="" />
                            <input onChange={e => setName(e.target.value)} className='bg-transparent outline-none' type="text" placeholder='Full Name' required />
                        </div>
                    )}
                    <div className='mb-4 flex text-white items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
                        <img src={assets.mail_icon} alt="" />
                        <input onChange={e => setEmail(e.target.value)} className='bg-transparent outline-none' type="email" placeholder='Email Id' required />
                    </div>
                    <div className='mb-4 flex text-white items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]'>
                        <img src={assets.lock_icon} alt="" />
                        <input onChange={e => setPassword(e.target.value)} className='bg-transparent outline-none' type="password" placeholder='Password' required />
                    </div>
                    <p onClick={() => navigate('/reset-password')} className='mb-3 text-indigigo-400 cursor-pointer'>Forgot Password?</p>
                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white cursor-pointer'>
                        {state}
                    </button>
                    {state==='Sign Up' ? (
                        <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? {' '} <span className='text-blue-600 cursor-pointer underline' onClick={() => setState('Log In')}>Login here</span> </p>
                    ) : (
                        <p className='text-gray-400 text-center text-xs mt-4'>Dont have an account? {' '} <span className='text-blue-600 cursor-pointer underline' onClick={() => setState('Sign Up')}>Sign Up</span> </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
