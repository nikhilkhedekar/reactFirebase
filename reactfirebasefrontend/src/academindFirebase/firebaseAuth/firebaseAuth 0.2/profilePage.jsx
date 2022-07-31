import { useContext } from 'react'

import { AuthContext } from "./AuthContextProvider"

const ProfilePage = () => {
    const authCtx = useContext(AuthContext)
    const onClickHandler = () => {
        authCtx.onSingOut();
    }
    return(
        <div>
            <span>profile</span>
            <button onClick={onClickHandler} > Sign Out </button>
        </div>
    )
}

export default ProfilePage