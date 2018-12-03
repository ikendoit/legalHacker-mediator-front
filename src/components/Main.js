import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Main extends React.Component<Props, States> {

  render(){
    return ( 
      <div>
        <div style={{
          position: 'absolute', top: 130,
          padding: 40,
          fontSize: 20,
        }}>
          <p> Screening Tool for  </p>
          <p> Family Violence and Power Imbalance </p>
          <p> In BC, in the interest of safety, all providers of Alternative Dispute Resolution Services for Family Law matters must screen for safety and process issues related to presence of Family Violence & Power Imbalance. Please note, the presence of Family Violence or Power Imbalance factors is not an immediate disqualifier from participation in Alternative Dispute Resolution processes. However, when those issues are present your service provider must make every effort to ensure that parties are as protected as possible throughout the entirety of the process. </p>
          <p> The following questionnaire will help give your service provider an understanding of your situation and its circumstances. Once it's completed, you'll be asked to set up a meeting with your service provider to discuss the matter further and discuss what, if any, safeguards and safety measures may be helpful or required to ensure the safety and security of all parties.</p>
          Thank you for your participation:
        </div>
        <Button style={{
          textAlign: 'center',
          position: 'absolute',
          top: 530,
          left: '38%',
          fontSize: 50,
          border: 'none'
        }}
        > 

          {this.props.user ?
            <div style={{textAlign: 'center'}}>
              <Link to="/questions" style={{}}>
                Begin Questionnaire
              </Link>
              <br />
              { this.props.user.first_name === 'admin' &&
                <div> 
                  <Link to="/checkQuestions" style={{}}>
                    Check All Questionaires
                  </Link>
                  <br/>
                  <Link to="/feedbacks" style={{}}>
                    Check All Feed Backs
                  </Link>
                </div>
              }
            </div>
            : 
            <h4><Link to="/account"> Please Log In </Link></h4>
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
