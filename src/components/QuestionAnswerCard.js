import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px',
    },
    profilePicture: {
        width: '100px',
    },
    resultsCard: {
        padding: '10px',
        marginBottom: '5px',
        position: 'relative',
        '& .chosen-icon': {
            display: 'none'
        }
    },
    chosenChoice: {
        backgroundColor: 'rgba(119,221,119, 0.5)',
        '& .chosen-icon': {
            display: 'block',
            position: 'absolute',
            top: '2px',
            right: '2px',
        }
    }
}))

function QuestionAnswerCard(props) {
    const { question, users, authedUser, id, klassName, match } = props
    const classes = useStyles();
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const author = question ? users[question.author] : null
    const currentUser = users[authedUser]
    const answered = question ? Object.keys(currentUser.answers).includes(id) : false
    const onDetailPage = match.path === '/questions/:id'

    const LinkToDetailPage = ({buttonText}) => (
        <Link to={`/questions/${question.id}`}>
            <Button variant="contained" color="primary">
                {buttonText}
            </Button>
        </Link>
    )

    const AnsweredSection = () => {
        const votesOptionOne = question.optionOne.votes.length
        const votesOptionTwo = question.optionTwo.votes.length
        const totalVotes = votesOptionOne + votesOptionTwo
        const percentageOptionOne = Math.floor((votesOptionOne / totalVotes) * 100)
        const percentageOptionTwo = Math.floor((votesOptionTwo / totalVotes) * 100)
        const currentUserChoice = currentUser.answers[id]
        return (
            <div>
                <h4>Results:</h4>
                <Paper className={`${classes.resultsCard} ${currentUserChoice === 'optionOne' ? classes.chosenChoice : ''}`}>
                    <CheckCircleIcon className='chosen-icon' />
                    <p>Would you rather {question.optionOne.text} {question.optionOne.text} {question.optionOne.text}?</p>
                    <LinearProgress variant="determinate" value={percentageOptionOne} />
                    <p>{`${votesOptionOne} out of ${totalVotes} votes`}</p>
                </Paper>
                <Paper className={`${classes.resultsCard} ${currentUserChoice === 'optionTwo' ? classes.chosenChoice : ''}`}>
                    <CheckCircleIcon className='chosen-icon' />
                    <p>Would you rather {question.optionTwo.text} {question.optionTwo.text} {question.optionTwo.text}?</p>
                    <LinearProgress variant="determinate" value={percentageOptionTwo} />
                    <p>{`${votesOptionTwo} out of ${totalVotes} votes`}</p>
                </Paper>
                {!onDetailPage && <LinkToDetailPage buttonText="Click Here to View Details" />}
            </div>
        )
    }

    const clickableChoices = (
        <div>Todo</div>
    )
    const disabledChoices = (
        <>
            <p>- {question.optionOne.text}?</p>
            <p>- {question.optionTwo.text}?</p>
            <LinkToDetailPage buttonText="Click Here to Vote" />
        </>
    )
    const UnansweredSection = () => (
        <div>
            <h4>Would You Rather...</h4>
            {onDetailPage
                ? clickableChoices
                : disabledChoices
            }
        </div>
    )

    return (
        <Paper className={`${classes.root} ${klassName ? klassName : ''}`}>
            <Grid container direction='row'>
                <Grid container justify='center' alignItems='center' item xs={12} md={4}>
                    { // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    }<img
                        className={classes.profilePicture}
                        src={author.avatarURL}
                        alt={`${author.name}'s Profile Picture`}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {answered
                        ? <AnsweredSection />
                        : <UnansweredSection />
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

function mapStateToProps({questions, users, authedUser}, {id}) {
    const question = questions[id] ? questions[id] : null
    return {
        question,
        users,
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(QuestionAnswerCard))
