import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/Reducer'
import NavBar from './navbar/NavBar'

const store = createStore(reducer, {userState: true});

class LostAndFound extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavBar/>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default LostAndFound;