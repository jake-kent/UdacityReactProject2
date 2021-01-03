import { useEffect } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { handleInitialData } from '../actions/shared'

import Home from './Home'
import Unauthed from './Unauthed'

function App(props) {
    useEffect(() => {
        props.dispatch(handleInitialData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Router>
            <LoadingBar />
            {props.authedUser === null
                ? <Unauthed />
                : <div>
                    <Route path='/' exact component={Home} />
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
