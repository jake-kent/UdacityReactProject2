import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setAuthedUser } from '../actions/authedUser'


const useStyles = makeStyles((theme) => ({
    title: {
        marginRight: '20px',
    },
    link: {
        marginRight: '10px',
    },
    userSection: {
        width: 'unset',
        flexGrow: 1,
    },
    profileImage: {
        width: '30px',
        marginLeft: '10px',
        marginRight: '10px',
    }
}))

function Nav(props) {
    const { user, dispatch } = props
    const classes = useStyles();

    const handleLogout = (e) => {
        e.preventDefault()
        const { history } = props
        dispatch(setAuthedUser(null))
        history.push('/')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <h4 className={classes.title}>Jake's Would You Rather App</h4>
                <Link className={classes.link} to='/'><Button variant="contained">Home</Button></Link>
                <Link className={classes.link} to='/add'><Button variant="contained">New Question</Button></Link>
                <Link className={classes.link} to='/leaderboard'><Button variant="contained">Leaderboard</Button></Link>
                <Grid container className={classes.userSection} direction="row" justify='flex-end' alignItems='center'>
                    <Grid item>
                        <p>Hello, {user.name}</p>
                    </Grid>
                    <Grid item>
                        { // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        }<img className={classes.profileImage} src={user.avatarURL} alt={`${user.avatarURL}'s Profile Picture`} />
                    </Grid>
                    <Button variant="contained" color='secondary' onClick={handleLogout}>
                        Logout
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

function mapStateToProps ({ authedUser, users }) {
    return {
        user: users[authedUser]
    }
}

export default withRouter(connect(mapStateToProps)(Nav))
