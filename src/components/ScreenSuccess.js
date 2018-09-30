import React from 'react';
import { connect } from 'react-redux';

class Success extends React.Component<Props, States> {
  render() {
    return (
      <div style={{ 
        margin: 100, 
        fontSize: 30, 
        backgroundColor: 'lightgreen',
        padding: 30
      }}>
        <h1> Success ✓</h1>
        <h2> We will run through your problem </h2>
        <h2> And will contact you within the next 5 business days. </h2>
        <h2> Please look forward to your email at: {this.props.user ? this.props.user.email : null} </h2>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount
});

export default connect(mapState, null)(Success)
