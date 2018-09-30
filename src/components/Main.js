import React from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import HeaderBar from './HeaderBar'

class Main extends React.Component<Props, States> {

  render(){
    console.log('hello world')
    return ( 
      <div>
        <Button style={{
          textAlign: 'center',
          position: 'absolute',
          top: '40%',
          left: '40%',
          fontSize: 50,
          border: 'none'
        }}
        > 
          {this.props.user ?
            <div style={{textAlign: 'center'}}>
              <Link to="/questions" style={{}}>
                Do Questionaire
              </Link>
              <br />
              <Link to="/checkQuestions" style={{}}>
                Check All Questionaires
              </Link>
            </div>
            : 
            <h4> Please Log In </h4>
          }
        </Button>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount
})

const mapDispatch = (dispatch) => ({
  setUser: dispatch.user.setUser
})

export default connect(mapState, mapDispatch)(Main)
