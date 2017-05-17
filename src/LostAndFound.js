import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/Reducer'

import NavBar from './navbar/NavBar'
import LoginUI from './login/Login'

const store = createStore(reducer, {userState: false});

class LostAndFound extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar/>
            <Route path={"/login"} component={LoginUI}/>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default LostAndFound;