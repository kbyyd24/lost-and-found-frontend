import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import NavBar from './navbar/NavBar'
import {Provider} from 'react-redux'

class LostAndFound extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div>
            <NavBar userState={false}/>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default LostAndFound;