import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Main extends React.Component<Props, States> {

  render(){
    return ( 
      <div>
        <Button style={{
          textAlign: 'center',
          position: 'absolute',
          top: '40%',
          left: '38%',
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
              { this.props.user.first_name === 'admin' &&
                <Link to="/checkQuestions" style={{}}>
                  Check All Questionaires
                </Link>
              }
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
