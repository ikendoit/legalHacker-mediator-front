import React from 'react'
import { connect } from 'react-redux'
import { Table, Modal, Button } from 'antd'

class ScreenQs extends React.Component<Props, States> {

  state = {
    data: null
  }
 
  columns = [{
      title: 'Complete Date',
      dataIndex: 'complete_date',
      key: 'complete_date',
      render: (text, record) => {
        // use moment.js to care for timezone in the future
        return (
          <span> {text !== null && text.replace('Z',' ').replace('T',' ')}</span>
        )
      }
    }, {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    }, {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
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
            <a onClick={(e) => this.checkMediate(record)}> Check Mediation </a>
          </span>
        )
      }
    }];

  checkMediate(record) {
    fetch(`http://localhost:8181/question_single/${record.id}`, {
      headers: {
        'Accept': 'application/json',
      },
      method: 'GET',
    })
      .then(data => data.json())
      .then(result => 
        Modal.confirm({
          title: 'Lets Mediate ! ',
          width: '70%',
          content: (
            <div style={{position: 'relative'}} > 
              <div style={{position: 'fixed', right: '30%'}}>
                <Button onClick={e => this.setAllowCase(record.id, true)}> Accept Case </Button>
                <Button onClick={e => this.setAllowCase(record.id, false)}> Decline Case </Button>
              </div>
              <h2> Preliminary </h2>
              { 
                result.content.preliminary.map((prelRecord, id) => 
                  <p key={`prel-${id}`}> {id}: {prelRecord.content} => {prelRecord.answer.toString()} </p>
                )
              }
              <h2> Ticks </h2> 
              { 
                Object.entries(result.content).map((section, sid) => {
                  return section[1].map((record, rid) => (
                    <p key={`prel-${rid}`}> {section[0]}-{rid}: {record.content} => {record.answer.toString() } </p>
                  ))
                })
              }
            </div>
          )
        })
      )
      .catch(err => {
        console.log(err)
      });
  }

  setAllowCase(question_id, allow) {
    fetch('http://localhost:8181/allow_case',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        question_id,
        allow
      })
    }).then(data => {
      this.loadDataList()
    })
  }

  loadDataList = () => {
    fetch('http://localhost:8181/questions_list')
      .then(data => data.json())
      .then(result => {
        this.setState({data: result})
      });
  }
   
  componentDidMount() {
    this.loadDataList()
  }

  render() {
    const {data} = this.state
    if (!data) return <h1 style={{textAlign: 'center', paddingTop: 200}}> loading... </h1>
    return (
      <Table 
        dataSource={data} 
        columns={this.columns} 
        style={{paddingTop: 100}}
      />
    )
  }
}

const mapState = state => ({
})

export default connect(mapState,null)(ScreenQs)
