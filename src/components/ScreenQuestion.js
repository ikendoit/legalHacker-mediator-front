import React from 'react'
import './style.css'
import {connect} from 'react-redux'
import message from 'antd/lib/message'
import { 
  checkSectionFilled,
  getNextUnFilled,
} from '../lib/checkSectionFilled'

const sections = [ 'hasThey', 'threat', 'doesThey', 'charged', 'history', 'harm' ]

class ScreenQuestion extends React.Component<Props, States>  {
  state = {
    section: 'preliminary', // or: 'non-preliminary'
    qIndex: 0,
  } 

  menuGoBack = () => {
    const {qIndex, section} = this.state
    const {questions} = this.props
    if (qIndex === 0 && section === 'preliminary') {
      this.props.history.push('/')
      return
    }
    if (section !== 'preliminary'){
      this.setState({
        section: 'preliminary', 
        qIndex: questions['preliminary'].length-1,
      })
    } else {
      this.setState({
        qIndex: this.state.qIndex-1,
      }) 
    }
  }

  menuGoForward = async () => {
    // check if next section/indexed record is filled 
    const allowed = this.validateFilled()
    const {questions, user} = this.props
    const {section, qIndex} = this.state
    if (!allowed) {
      message.error('Please Fill all tick boxes first.')
      return
    }
    if (section === 'preliminary'){
      if (qIndex === questions[section].length-1){
        // check if preliminary is false
        if (!this.validateValidPreliminary()) {
          message.error('Cannot Mediate. Sorry, go to court')
          this.props.history.push('/')
          return
        }
        this.setState({
          qIndex: 0,
          section: 'non-preliminary'
        })
      } else {
        this.setState({
          qIndex: qIndex+1,
        })
      }
    } else {
      const questionsString = JSON.stringify(questions).replace(/'/g,"''");
      try {
        fetch('http://localhost:8181/questions', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            questions: questionsString,
            user,
          })
        })
          .then(async result => {
            await this.props.history.push('/success')
          })
          .catch(error => {
            console.log(error)
            message.error(error)
            return
          });
       } catch(err) {
         console.log(err)
       }
    }
  }

  validateFilled = () => {
    const questions = this.props.questions
    const {section, qIndex} = this.state
    if (section === 'preliminary') {
      if (questions[section][qIndex] && questions[section][qIndex].answer !== null) {
        return true
      }
    } else {
      for (let section of sections) {
        if (questions[section].some(record => record.answer === null)){
          return false
        }
      }
      return true
    }

    return false
  }

  validateValidPreliminary = () => {
    const {questions} = this.props
    return questions.preliminary.every(record => record.answer === false)
  }

  answerQuestion = (index, section, answer) => {
    this.props.answerQuestion({id: index, section, answer})
  }

  selectPreliminary = () => {
    const questions = this.props.questions
    if (!checkSectionFilled(questions['preliminary'])) {
      return {
        ...getNextUnFilled(questions['preliminary']),
        section: 'preliminary'
      }
    }
    return null
  }

  renderQuestion = () => {
    const {qIndex, section} = this.state
    const {questions} = this.props
    const question = questions[section][qIndex]
    console.log(question)
    if (!question) return (<h1> error, blame Ken </h1>)
    return (
      <div 
        key={question.content}
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
        }}>
        <p style={{
          display: 'inline',
          fontSize: 40
        }}>
          {question.content}
        </p>
        <input 
          type='checkbox' 
          name={question.content}
          style={{width: 25, height: 25}}
          onChange={(e) => this.answerQuestion(qIndex, section, true)}
          checked={question.answer === true}
          value={true}
        /> yes
        <input 
          type='checkbox' 
          name='preliminary'
          style={{width: 25, height: 25}}
          checked={question.answer === false}
          onChange={(e) => this.answerQuestion(qIndex, section, false)}
          value={false}
        /> no
      </div>
    )
  }

  renderTickBox = () => {
    const questions = this.props.questions
    const ticks = sections.map(section => {
      return (
        <fieldset style={{marginTop: 30}}>
          <legend style={{fontSize: 25}}> {section} </legend>
          {
            questions[section].map((question,id) => (
              <div 
                className="tickBox"
                style={{
                  position: 'relative',
                  lineHeight: 2,
                  borderTop: 'solid 2px lightpink'
                }}>
                {question.content}
                <div style={{
                  right: 0
                }}>
                  <input 
                    type='checkbox' 
                    name={question.content}
                    style={{width: 25, height: 25}}
                    onChange={(e) => this.answerQuestion(id, section, true)}
                    checked={question.answer === true}
                    value={true}
                  /> yes
                  <input 
                    type='checkbox' 
                    name='preliminary'
                    style={{width: 25, height: 25}}
                    checked={question.answer === false}
                    onChange={(e) => this.answerQuestion(id, section, false)}
                    value={false}
                  /> no
                </div>
              </div>
            ))
          }
        </fieldset>
      )
    });
    return ticks
  }

  render() {

    const prel = this.state.section === 'preliminary' 
    return (
      <div style={{
        paddingBottom: 50
      }}>
        <h1 className="title" style={{
          textAlign: 'center',
          paddingTop: 150,
          marginLeft: '-5%',
          letterSpacing: 8,
          size: 25,
        }}> Screening Question </h1>
        <div style={{
          paddingLeft: '10%',
          width: '80%',
          textAlign: 'center'
        }}>
          { prel ? this.renderQuestion() : this.renderTickBox()}
        </div>
        <div style={{
          position: 'fixed',
          top: '50%',
          left:0,
          fontSize: 50,
        }}
          onClick={this.menuGoBack}
        >
          ◀ 
        </div>
        <div style={{
          position: 'fixed',
          top: '50%',
          right:0,
          fontSize: 50
        }}
          onClick={this.menuGoForward}
        >
          ▶
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  questions: state.questions,
  user: state.user.userAccount,
})

const mapDispatch = (dispatch) => {
  return {
    setQuestions: dispatch.questions.setQuestions,
    answerQuestion: dispatch.questions.answerQuestion,
    submitQuestions: dispatch.questions.submitQuestions,
  }
}

export default connect(mapState, mapDispatch)(ScreenQuestion)
