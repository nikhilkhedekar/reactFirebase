import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import axios from 'axios';    
import store from 'd:/youtube/firebase/freecodecamp/classsed-react-firebase-client-master/classsed-react-firebase-client-master/src/redux/store';
import { SET_AUTHENTICATED } from 'd:/youtube/firebase/freecodecamp/classsed-react-firebase-client-master/classsed-react-firebase-client-master/src/redux/types';
import signup from 'd:/youtube/firebase/freecodecamp/classsed-react-firebase-client-master/classsed-react-firebase-client-master/src/pages/signup';

axios.defaults.baseURL = 'https://europe-west1-socialape-d081e.cloudfunctions.net/api';

const token = localStorage.getItem('FBIdToken');

if(token) {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()){
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }else{
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component{
    render(){
        return(
            <MuiThemeprovider theme={theme}>
                <Provider store={store} >
                    <Router>
                        <Navbar />
                        <div className='container'>
                            <Switch>
                                <Route exact path='/' component={home} />
                                <AuthRoute exact path='/login' component={login} />
                                <AuthRoute exact path='/signup' component={signup} />
                                <Route exact path='/users/:handle' component={user} />
                                <Route exact path='/users/:handle/scream/:sreamId'
                                component={user} />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeprovider>
        )
    }
}

export default App;