import React from 'react'
import { 
  Button, 
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
    const {user, userSchedule} = this.props
    return ( 
      <div className="header" >
        { user ? 
          (
            <div>
              <span> Hello {user.first_name} </span>
              <Button onClick={this.onSignOut}> Sign out </Button>
              <Button onClick={(e) => history.push('schedules')}> My Schedules, {userSchedule ? userSchedule.length: '--'}/{user.countScheds} un-set </Button>
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
            paddingLeft: '38%',
            fontSize: 60,
            color: 'lightcoral',
            cursor: 'pointer'
          }} 
            onClick={e => history.push('/')}> Auto Mediator </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount,
  userSchedule: state.user.userSchedule,
})

const mapDispatch = (dispatch) => ({
  setUser: dispatch.user.setUserAccount
})

export default connect(mapState, mapDispatch)(HeaderBar)
