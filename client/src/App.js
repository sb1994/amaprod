import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  componentDidMount() {
    axios
      .get('/api/users/test')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        <h1>APP.js</h1>
      </div>
    )
  }
}
