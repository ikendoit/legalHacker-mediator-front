import React from 'react';
import { 
  DatePicker,
  Table, 
  Modal,
  message,
} from 'antd';
import { connect } from 'react-redux';

class Schedule extends React.Component<Props, States> {
  state = {
    data: null,
    date: null,
    note: null,
  }

  columns = [
    {
      title: 'Meeting Date',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => {
        return (
          <span> {text !== null && text.replace('Z',' ').replace('T',' ')}</span>
        )
      }
    }, 
    {
      title: 'Form Complete Date',
      dataIndex: 'complete_date',
      key: 'complete_date',
      render: (text, record) => {
        return (
          <span> {text !== null && text.replace('Z',' ').replace('T',' ')}</span>
        )
      }
    }, {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: 'Mediatable',
      dataIndex: 'allow',
      key: 'allow',
      render: (text,record) => {
        return (
          <span> {text !== null && text.toString()} </span>
        )
      }
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        return (
          <span> 
            <a disabled={record.allow !== true} onClick={(e) => this.setSchedule(record)}> Set my schedule </a>
          </span>
        )
      }
    }
  ];

  onDateChange = (date) => {
    this.setState({date: date.toISOString()})
  }

  setSchedule = (record) => {
    Modal.confirm({
      title: 'Update my schedule.',
      content: (
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Choose Meeting Time"
          onChange={this.onDateChange}
        />
      ),
      onOk: async () => {
        const {note, date} = this.state
        await fetch(`http://localhost:8181/schedule/${record.id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify({
            note,
            date
          })
        })
          .then(async data => {
            await this.loadMySchedules()
          });
      }
    });
  }

  loadMySchedules = async () => {
    const {user} = this.props
    fetch(`http://localhost:8181/schedule/${user.id}`)
      .then(data => data.json())
      .then(async result => {
        await this.setState({data: result})
      });
  }

  componentWillMount = () => {
    if (!this.props.user){
      this.props.history.push('/')
    }
  }

  componentDidMount = () => {
    this.loadMySchedules()
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

export default connect(mapState, mapDispatch)(Schedule)
