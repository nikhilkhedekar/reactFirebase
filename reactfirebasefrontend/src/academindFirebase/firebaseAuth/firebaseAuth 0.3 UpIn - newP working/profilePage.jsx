import React, { useContext, useState, useRef } from 'react'

import AuthContext from './authContext'

const ProfilePage = () => {
    const [loading, setLoading] = useState(false)
    const newPasswordRef = useRef()
    const authCtx = useContext(AuthContext)
    const submitHandler = (e) => {
        e.preventDefault();
        const newPassword = newPasswordRef.current.value;
        setLoading(true)
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idToken: authCtx.token,
                password: newPassword,
                returnSecuredToken: false,
            }),
        })
        .then(res => {
            setLoading(false)
            console.log(res)
        })
        .catch(err => alert(err))
    }
    return(
        <div>
            <h3>Profile Page</h3>
            <form onSubmit={submitHandler} >
                <label htmlFor='password' >
                <input type='password' id='password' ref={newPasswordRef} />
                </label>
                <input type='submit' value='Change Password' />
            </form>
        </div>
    )
}

export default ProfilePage