import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    rootGrid: {
        minHeight: '100vh',
    },
    paperGrid: {
        padding: '20px',
    }
}))

export default function FourOhFour() {
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
                        <h1>This page doesn't exist.</h1>
                        <Link className={classes.link} to='/'><Button variant="contained">Go To Homepage</Button></Link>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
