import React from 'react'
import EventList from './EventList.js'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <h1>{this.props.message}</h1>
          <EventList />
        </div>
      </Provider>
    )
  }
}

export default App
