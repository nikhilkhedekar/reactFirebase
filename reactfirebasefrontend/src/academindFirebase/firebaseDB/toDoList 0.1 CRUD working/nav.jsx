import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom'
import React, { lazy, Suspence } from 'react'

import PostList from './postList'
import PutItem from './putItem'
import GetList from './getList'

const Nav = () => {
    const postList = lazy(() => import('./postList'));
    const getList = lazy(() => import('./getList'));
    const putItem = lazy(() => import('./putItem'));
    return (
        <Router>

            <Switch>
                <Route exact path='/' >
                    <div>
                        <div><PostList /></div>
                        <div><GetList /></div>
                    </div>
                </Route>
                <Route path='/putItem/:listIds'>
                    <PutItem />
                </Route>
                <Redirect to='/' >
                    <div>
                        <div><PostList /></div>
                        <div><GetList /></div>
                    </div>
                </Redirect>
            </Switch>
        </Router>
    )
}

export default Nav