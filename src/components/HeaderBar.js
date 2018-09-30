import React from 'react'
import ReactDOM from 'react-dom';
import { 
  Button, 
  Input,
  Modal
} from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../history'

class HeaderBar extends React.Component<Props, States> {

  onSignOut = () => {
    this.props.setUser(null)
    history.push('/')
  }

  render(){
    const paddingLeft = this.props.user ? '37%' : '40%'
    const {user} = this.props
    return ( 
      <div className="header" >
        { user ? 
          (
            <div>
              <span> Hello {user.first_name} </span>
              <button onClick={this.onSignOut}> Sign out </button>
            </div>
          ):
          (
            <div style={{
            }}>
              <Link to="/account"> Create/Login </Link>
            </div>
          )
        }
          <div style={{
            position: 'absolute',
            top: 20,
            paddingLeft,
            fontSize: 60,
            color: 'lightcoral',
          }}> Auto Mediator </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount
})

const mapDispatch = (dispatch) => ({
  setUser: dispatch.user.setUserAccount
})

export default connect(mapState, mapDispatch)(HeaderBar)
