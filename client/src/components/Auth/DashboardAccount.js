import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAt } from '@fortawesome/free-solid-svg-icons'
class DashboardAccount extends Component {
  render() {
    let { user } = this.props.auth

    return (
      <div className='col-12 col-md-3 card' style={{ height: '20%' }}>
        <div className='row justify-content-center '>
          <div className='col-12 text-center'>
            <img
              src={user.profile_pic}
              alt=''
              srcset=''
              className='img-fluid rounded-circle'
              style={{ height: '100px' }}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div class='card-body'>
              <ul class='list-group list-group-flush'>
                <li class='list-group-item'>
                  <FontAwesomeIcon icon={faUser} size='lg' />{' '}
                  <span>{user.name}</span>
                </li>
                <li class='list-group-item'>
                  <FontAwesomeIcon icon={faAt} size='lg' />{' '}
                  <span>{user.email}</span>
                </li>
                <li className='list-group-item'>
                  <Link to='/account/edit'>Edit Profile</Link>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardAccount)
)
