import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    axios
      .get('/api/users')
      .then((res) => {
        console.log(res.data)
        this.setState({
          users: res.data.users,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    let { users } = this.state
    if (users === undefined || users.length === 0) {
      return (
        <div>
          <h1>no users</h1>
        </div>
      )
    } else {
      let renderUsersNames = users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
        </div>
      ))
      return <div>{renderUsersNames}</div>
    }
  }
}
