import React from 'react';
import { connect } from 'react-redux';
import { 
  DatePicker,
  Input,
  Button,
} from 'antd'
import { Link } from 'react-router-dom'

class Success extends React.Component<Props, States> {
  state = {
    email: null,
    date: null
  }

  onSubmitEmail = () => {
  }

  onSubmitForm = () => {
  }

  render() {
    return (
      <div style={{ 
        margin: 100, 
        fontSize: 30, 
        backgroundColor: 'lightpink',
        padding: 30
      }}>

        <div> 
          <h2> Thank you for your participation. </h2>
          <h3> Based on the information you've provided, we believe that your matter is unsuitable for resolution within an Alternative Dispute Resolution process. As such, we are unable to proceed further in the screening process at this time. </h3>
          <h3> If you believe you've received this message in error you can contact your service provider by clicking <Link to="/contact">here.</Link> </h3>
          <h3>Thank you for your understanding</h3>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount
});

export default connect(mapState, null)(Success)
