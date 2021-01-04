import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import QuestionAnswerCard from './QuestionAnswerCard'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
    }
}))


export default function QuestionAnswerView(props) {
    const { match } = props
    const classes = useStyles();
    const { id } = match.params
    if (!id) {
        return <p>This Question doesn't exist</p>
    }
    return (
        <Grid className={classes.root} container direction='row' justify='center'>
            <Grid item xs={11} md={10} lg={8}>
                <QuestionAnswerCard id={id} />
            </Grid>
        </Grid>
    )
}
