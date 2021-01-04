import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import LeaderboardCard from './LeaderboardCard'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
    },
    leaderboardCard: {
        marginBottom: '10px',
    }
}))

function Leaderboard(props) {
    const { users } = props
    const classes = useStyles();
    return (
        <Grid classes={{root: classes.root}} container direction='row' justify='center'>
            <Grid item xs={11} md={10} lg={8}>
                {users.map((id) => (
                    <LeaderboardCard klassName={classes.leaderboardCard} key={id} id={id} />
                ))}
            </Grid>
        </Grid>
    )
}

function mapStateToProps ({ users }) {
    return {
        users: Object.keys(users)
            .sort((a, b) => {
                const totalA = Object.keys(users[a].answers).length + users[a].questions.length
                const totalB = Object.keys(users[b].answers).length + users[b].questions.length
                return totalB - totalA
            })
    }
}

export default connect(mapStateToProps)(Leaderboard)
