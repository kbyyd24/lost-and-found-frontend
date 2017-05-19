import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from './reducers/Reducer'

import NavBar from './navbar/NavBar'
import Login from './login/Login'
import SignIn from './signIn/SignIn'
import Lost from './lost/Lost'
import LostNew from './lost/LostNew'
import LostItem from './lost/LostItem'

import initialState from './StateCreator'

const store = createStore(reducer, initialState, applyMiddleware(thunk));

class LostAndFound extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/signIn"} component={SignIn}/>
            <Route exact path={"/losts"} component={Lost}/>
            <Route path={"/lost/new"} component={LostNew}/>
            <Route path={"/losts/:itemId"} component={LostItem}/>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default LostAndFound;