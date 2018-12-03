import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './model/store'
import Main from './components/Main'
import HeaderBar from './components/HeaderBar'
import ScreenSchedule from './components/ScreenSchedule'
import ScreenQuestion from './components/ScreenQuestion'
import ScreenSuccess from './components/ScreenSuccess'
import ScreenFailure from './components/ScreenFailure'
import ScreenCheckQs from './components/ScreenCheckQs'
import ScreenContact from './components/ScreenContact'
import ScreenFeedBack from './components/ScreenFeedBack'
import Forms from './components/forms'
import history from './history'

import { 
  Router, 
  Route, 
  Switch,
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div> 
          <Router history={history}>
            <div>
              <HeaderBar />
              <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/schedules' component={ScreenSchedule}/>
                <Route exact path='/questions' component={ScreenQuestion}/>
                <Route exact path='/account' component={Forms}/>
                <Route exact path='/checkQuestions' component={ScreenCheckQs}/>
                <Route exact path='/contact' component={ScreenContact}/>
                <Route exact path='/feedbacks' component={ScreenFeedBack}/>
                <Route exact path='/success' component={ScreenSuccess}/>
                <Route exact path='/unmediatable' component={ScreenFailure}/>

                <Route path='/' component={Main}/>
              </Switch>
            </div>
          </Router> 
        </div>
      </Provider>
    );
  }
}

export default App;
