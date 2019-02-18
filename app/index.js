import React from 'react'
import EventList from './EventList.js'

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <h1>{this.props.message}</h1>
        <EventList />
      </div>
    )
  }
}

export default App
