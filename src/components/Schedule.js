import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';

export default class Schedule extends React.Component<Props, States> {
  render() {
    return (
      <div style={{ margin: 100 }}>
        <h1> hello world </h1>
        <h1>AntDesign Demo</h1>
        <hr /><br />
        <DatePicker />
      </div>
    )
  }
}
