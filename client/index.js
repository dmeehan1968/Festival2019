import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from '../app/components/App'
import { createStore } from 'redux'
import rootReducer from '../app/reducers'
import { setEvents } from '../app/actions'
import '../styles/stylesheet.less'

const store = createStore(rootReducer, window.__INITIAL_STATE__)

ReactDOM.hydrate((
    <Provider store={store}>
      <App message="Hello Client"/>
    </Provider>
  ),
  document.getElementById("root")
)
