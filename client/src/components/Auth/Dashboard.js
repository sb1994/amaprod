import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/userAuthActions'

export class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    } else {
      this.props.getCurrentUser()
      // this.props.getPosts(this.props.auth.user._id)
      console.log(this.props)
    }
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, { getCurrentUser })(Dashboard)
