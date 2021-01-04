import { useEffect } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'

import Nav from './Nav'
import Home from './Home'
import Unauthed from './Unauthed'
import AddQuestionView from './AddQuestionView'
import QuestionAnswerView from './QuestionAnswerView'
import Leaderboard from './Leaderboard'
import FourOhFour from './404'

function App(props) {
    const { dispatch } = props
    useEffect(() => {
        dispatch(handleInitialData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Router>
            <LoadingBar />
            {props.authedUser === null
                ? <Unauthed />
                : <div>
                    <Nav />
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/add' component={AddQuestionView} />
                        <Route path='/leaderboard' component={Leaderboard} />
                        <Route path='/questions/:id' component={QuestionAnswerView} />
                        <Route component={FourOhFour} />
                    </Switch>
                </div>
            }
        </Router>
    );
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
