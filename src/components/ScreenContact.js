import React from 'react';
import { 
  DatePicker,
  Button,
  Input, 
  message,
} from 'antd';
import {connect} from 'react-redux'

class Contact extends React.Component<Props, States> {

  state = {
    date: null,
    email: null,
  }

  submitFeedBack = (feedBack) => {
    const { user } = this.props
    if (!user) {
      message.error('Please log in.')
      return
    }
    try {
      fetch('http://localhost:8181/feed_back', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          user,
          feedBack
        })
      })
      message.success('Submitted Feed Back successfully')
    } catch(err) {
      console.log(err)
    }
  }

  submitSchedule = () => {
    const { date } = this.state
    if (!date) {
      message.error('Please select a time of meet up.')
      return
    }
    this.submitFeedBack({
      type: 'schedule-meet-up',
      schedule_date: date
    })
  }

  submitEmail = () => {
    // email content of text area
    const { email } = this.state
    if (!email) {
      message.error('Please add some content to your mail.')
      return
    }
    this.submitFeedBack({
      type: 'mail',
      content: email
    })
  }

  render() {

    return (
      <ul style={{
        paddingTop: 200
      }}>
        <li>
          <div> Contact to talk in person: </div>
          <div 
            style={{padding: 20}}
          > 
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Choose Meeting Time"
              onChange={(e) => this.setState({date: e.toISOString()})}
            />
            <Button onClick={this.submitSchedule}> Set Schedule </Button>
          </div>
        </li>
        <li style={{paddingTop: 100}}> 
          <div> Send us an email if you have questions: </div>
          <div  
            style={{padding: 20}}
          >
            <Input.TextArea 
              onChange={e => 
                this.setState({email: e.target.value})
              }
            />
            <Button onClick={this.submitEmail}> Send Email </Button>
          </div>
        </li>
      </ul>
    )
  }
}


const mapState = (state) => ({
  user: state.user.userAccount
})

export default connect(mapState, null)(Contact)
