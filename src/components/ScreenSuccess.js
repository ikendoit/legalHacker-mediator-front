import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Success extends React.Component<Props, States> {
  render() {
    return (
      <div style={{ 
        margin: 100, 
        fontSize: 30, 
        backgroundColor: 'lightgreen',
        padding: 30
      }}>

        <h2> Thank you for your participation in the screening process.</h2>
        <h3> Based on the information you've provided, we believe that your matter may be suitable for resolution within an Alternative Dispute Resolution process. As such, we are referring you to the next stage of the process where your service provider will meet with the parties individually to review the information you submitted and plan next steps.</h3>
        <h3> If you would like to contact your service provider for more information, please click <Link to="/contact">here. </Link></h3>
        <h3> If you'd like to make an appointment with your service provider, please access their <Link to="/schedules"> appointment scheduler here. </Link> </h3>
        <h3> Thank you for your participation. We look forward to meeting with you. </h3>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount
});

export default connect(mapState, null)(Success)
