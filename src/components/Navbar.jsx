import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../actions/actionLogin'

const Navbar = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(startLogout())

    }
    
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                
                <p className="navbar-brand h3">Usuario: Silvia</p>
                <button className="navbar-brand btn btn-outline-danger" 
                onClick={handleLogout}>
                 Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
