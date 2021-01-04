import { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { handleAddQuestion } from '../actions/questions'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
    },
    divider: {
        width: '100%',
    },
    paperGrid: {
        padding: '20px',
    },
    fullWidth: {
        width: '100%',
    },
    submit: {
        width: '100%',
        marginTop: '20px',
    }
}))


function AddQuestionView(props) {
    const [ optionOne, setOptionOne ] = useState('')
    const [ optionTwo, setOptionTwo ] = useState('')
    const classes = useStyles();
    const formComplete = optionOne !== '' && optionTwo !== ''

    const handleChange = (e, option) => {
        const value = e.target.value
        if (option === 'optionOne') {
            setOptionOne(value)
        } else {
            setOptionTwo(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, authedUser, history } = props

        dispatch(handleAddQuestion({optionOneText: optionOne, optionTwoText: optionTwo, author: authedUser}))
        history.push('/')
    }

    return (
        <Grid className={classes.root} container direction='row' justify='center'>
            <Grid item xs={11} md={10} lg={8} xl={6}>
                <Paper>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        wrap="nowrap"
                        classes={{root: classes.paperGrid}}
                    >
                        <h2>Create New Question</h2>
                        <Divider classes={{root: classes.divider}} variant="middle" />
                        <h4>Complete the question:</h4>
                        <h3>Would you rather...</h3>
                        <form onSubmit={handleSubmit} className={classes.fullWidth}>
                            <TextField
                                classes={{root: classes.fullWidth}}
                                onChange={(e) => handleChange(e, 'optionOne')}
                                value={optionOne}
                                label="Option One"
                                helperText="i.e. eat vanilla ice cream"
                            />
                            <h3>Or</h3>
                            <TextField
                                classes={{root: classes.fullWidth}}
                                onChange={(e) => handleChange(e, 'optionTwo')}
                                value={optionTwo}
                                label="Option Two"
                                helperText="i.e. eat chocolate ice cream"
                            />
                            <Button
                                className={classes.submit}
                                disabled={!formComplete}
                                variant="contained"
                                color="primary"
                                type='submit'
                            >
                                Submit
                            </Button>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(AddQuestionView))
