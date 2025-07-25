import React, { useContext } from 'react'
import { assets } from '../assets/asset'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()

    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)

    const sendVerificationOtp = async() => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
            if(data.success) {
                navigate('/email-verify')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch(err) {
            toast.error(err.message)
        }
    }

    const logout = async() => {
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedIn(false)
            data.success && setUserData(false)
            navigate('/')
        } catch(err) {
            toast.error(err.message)
        }
    }

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 absolute top-0'>
            <img src={assets.logo} alt="" className='w-28 sm:w-32' />
            {userData ? 
            <div className='w-10 h-10 group flex justify-center items-center rounded-full bg-black/70 text-white relative'>
                {userData.name[0].toUpperCase()}
                <div className='absolute min-w-30 hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                    <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                        {!userData.isAccountVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={sendVerificationOtp}>Verify email</li>}
                        <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Log Out</li>
                    </ul>
                </div>
            </div> :
                <button onClick={() => navigate('/login')} className='flex items-center gap-2 px-6 py-2 cursor-pointer border border-gray-500 rounded-full hover:bg-gray-100 transition-all duration-200'>Login <img src={assets.arrow_icon} alt="" /> </button>
            }
        </div>
    )
}

export default Navbar
