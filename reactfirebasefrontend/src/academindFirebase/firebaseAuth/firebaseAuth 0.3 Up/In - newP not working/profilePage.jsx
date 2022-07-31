import { useContext, useRef } from 'react'

import { AuthContext } from "./AuthContextProvider"

const ProfilePage = () => {
    const authCtx = useContext(AuthContext)
    const passwordRef = useRef()
    const submitHandler = () => {
        const newPassword = passwordRef.current.value
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBIo-40ixEfvE5Lwl4kL5khBoXJWFOT1qQ', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idToken: authCtx.token,
                newPassword,
                returnSecuredToken: false,
            }),
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => alert(err))
    }
    return(
        <div>
            <h3>Profile Page</h3>
            <form onSubmit={submitHandler} >  
                <input type='password' ref={passwordRef} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default ProfilePage

/**<form onSubmit={submitHandler} >
<div>
    <label htmlFor='newpassword' >
        <input id='newpassword' type='password' ref={newPasswordRef} />
    </label>
</div>
<div>
    <button>Change Password</button>
</div>
</form> */
