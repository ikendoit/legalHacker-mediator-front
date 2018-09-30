import React from 'react'
import {connect} from 'react-redux'
import ActionForm from './SignIn'

class Form extends React.Component {
  render() {
    return (
      <ActionForm 
        user={this.props.user}
        login={this.props.login}
        signup={this.props.signup}
        setUser={this.props.setUser}
        setUserSchedule={this.props.setUserSchedule}
        history={this.props.history}
      />
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount
})
const mapDispatch = (dispatch) => {
  return {
    signup: dispatch.user.signup,
    login: dispatch.user.login,
    setUser: dispatch.user.setUserAccount,
    setUserSchedule: dispatch.user.setUserSchedule,
  }
}

export default connect(mapState, mapDispatch)(Form)
