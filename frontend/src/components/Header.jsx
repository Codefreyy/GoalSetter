import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';

const  Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user}  = useSelector((state)=> state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
        <div className='logo'>
            <Link to='/'>GoalSetter</Link>
        </div>
        <ul>
            {
                user ? (
                    <li>
                <Link to='/login'>
                    <button className='btn' onClick={onLogout}> 
                    <FaSignOutAlt/> Logout
                    </button>
                </Link>
            </li>
                ) : 
                <>
                 <li>
                <Link to='/login'>
                    <FaSignInAlt/> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaSignOutAlt/> register
                </Link>
            </li>
                </>
            }
           
            <li>
                <Link to='/user'>
                    <FaUser/> User
                </Link>
            </li>
            

        </ul>
        </header>
  )
}

export default Header