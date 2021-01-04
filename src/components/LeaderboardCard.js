import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px',
    },
    profilePicture: {
        width: '100px',
    },
    scoreTitle: {
        paddingTop: '5px',
        paddingBottom: '5px',
        backgroundColor: 'lightgray',
        width: '100%',
        textAlign: 'center',
    },
    scoreIconWrapper: {
        border: '1px solid black',
        width: '100%',
        textAlign: 'center',
        paddingTop: '5px',
        paddingBottom: '5px',
    },
    scoreIcon: {
        width: '30px',
        height: '30px',
        backgroundColor: '#6bcba9',
        borderRadius: '30px',
        color: 'white',
    }
}))

function LeaderboardCard(props) {
    const classes = useStyles();
    const { user, klassName } = props
    if (user === null) {
        return <p>This User doesn't exist</p>
    }
    const answeredQuestions = Object.keys(user.answers).length
    const createdQuestions = user.questions.length
    const totalScore = answeredQuestions + createdQuestions
    return (
        <Paper className={`${classes.root} ${klassName ? klassName : ''}`}>
            <Grid container direction='row'>
                <Grid container justify='center' alignItems='center' item xs={12} md={3}>
                    { // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    }<img
                        className={classes.profilePicture}
                        src={user.avatarURL}
                        alt={`${user.name}'s Profile Picture`}
                    />
                </Grid>
                <Grid container item xs={12} md={7}>
                    <Grid item xs={12}>
                        <h3>{user.name}</h3>
                    </Grid>
                    <Grid item xs={12}>
                        Answered questions: {answeredQuestions}
                    </Grid>
                    <Grid item xs={12}>
                        Created questions: {createdQuestions}
                    </Grid>
                </Grid>
                <Grid container justify='center' alignItems='center' item xs={12} md={2}>
                    <Grid container justify='center' alignItems='center' item xs={10}>
                        <span className={classes.scoreTitle}>Score</span>
                        <Grid container justify='center' alignItems='center' item className={classes.scoreIconWrapper}>
                            <Grid container justify='center' alignItems='center' item className={classes.scoreIcon}>
                                {totalScore}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}


function mapStateToProps ({ users }, { id }) {
    const user = users[id] ? users[id] : null
    return {
        user
    }
}

export default connect(mapStateToProps)(LeaderboardCard)
