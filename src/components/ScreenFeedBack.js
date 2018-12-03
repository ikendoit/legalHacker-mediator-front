import React from 'react';
import { 
  DatePicker,
  Table, 
  Modal,
  message,
} from 'antd';
import { connect } from 'react-redux';

class FeedBack extends React.Component<Props, States> {
  state = {
    data: null,
  }

  columns = [
    {
      title: 'User ID',
      dataIndex: 'id',
      key: 'id',
    }, 
    {
      title: 'Submit Date',
      dataIndex: 'date_created',
      key: 'date_created',
      render: (text, record) => {
        return (
          <span> {text !== null && text.replace('Z',' ').replace('T',' ')}</span>
        )
      }
    }, {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: 'Schedule Date',
      dataIndex: 'schedule_date',
      key: 'schedule_date',
      render: (text, record) => {
        return (
          <span> {text !== null && text.replace('Z',' ').replace('T',' ')}</span>
        )
      }
    },{
      title: 'type',
      dataIndex: 'type',
      key: 'type',
    } 
  ];

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    fetch('http://localhost:8181/get_feed_backs', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(data => data.json())
      .then(result => this.setState({data: result}))
  }

   render() {
    const {data} = this.state
    return (
      <div style={{ margin: 100 }}>
        <Table 
          dataSource={data} 
          columns={this.columns} 
          style={{paddingTop: 100}}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user.userAccount,
  userSchedule: state.user.userSchedule,
})

const mapDispatch = (dispatch) => ({
  setUserSchedule: dispatch.user.setUserSchedule,
})

export default connect(mapState, mapDispatch)(FeedBack)
