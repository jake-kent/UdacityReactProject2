import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { setAuthedUser } from '../actions/authedUser'

const useStyles = makeStyles((theme) => ({
    rootGrid: {
        minHeight: '100vh',
    },
    divider: {
        width: '100%',
    },
    paperGrid: {
        padding: '20px',
    }
}))

function Unauthed(props) {
    const { userIds, users, dispatch } = props
    
    const handleChange = (e) => {
        e.preventDefault()
        const userId = e.target.value
        dispatch(setAuthedUser(userId))
    }
    const classes = useStyles();
    return (
        <Grid classes={{root: classes.rootGrid}} container direction='row' justify='center' alignItems='center'>
            <Grid item xs={11} md={10} lg={8}>
                <Paper>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        wrap="nowrap"
                        classes={{root: classes.paperGrid}}
                    >
                        <h3>Welcome to Jake's Would You Rather App</h3>
                        <p>Select a user below to login</p>
                        <Divider classes={{root: classes.divider}} variant="middle" />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            value=''
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Select a User</MenuItem>
                            {userIds.length > 0 && userIds.map((userId) => (
                                <MenuItem key={users[userId].id} value={users[userId].id}>{users[userId].name}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

function mapStateToProps ({users}) {
    const userIds = Object.keys(users)
    return {
        userIds,
        users
    }
}

export default connect(mapStateToProps)(Unauthed)
