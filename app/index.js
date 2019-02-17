import React from 'react'

class App extends React.Component {
  render() {
    return (<div id="app">
      <h1>{this.props.message}</h1>
      <p>Welcome to React!</p>
    </div>)
  }
}

export default App
