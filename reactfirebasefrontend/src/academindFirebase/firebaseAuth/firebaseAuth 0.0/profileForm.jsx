import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { AuthContext } from './authContextProvider'

const ProfileForm = () => {
    const authContext = useContext(AuthContext);
    const newPasswordRef = useRef();
    const history = useHistory();
    const submitHandler = () => {
        const newpassword = newPasswordRef.current.value;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: authContext.token,
                newpassword,
                returnSecuredToken: false, 
            }),
            
        }).then((res) => {
            console.log(res)
            history.replace('/')
        })
    }
    return(
        <form onSubmit={submitHandler} >
            <div>
                <label htmlFor='newpassword' >
                    <input id='newpassword' type='password' ref={newPasswordRef} />
                </label>
            </div>
            <div>
                <button>Change Password</button>
            </div>
        </form>
    )
}

export default ProfileForm