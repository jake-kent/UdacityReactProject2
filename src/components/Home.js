import { useState } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import TabPanel from './TabPanel'
import QuestionAnswerCard from './QuestionAnswerCard'

const useStyles = makeStyles((theme) => ({
    tabBar: {
        marginTop: '20px',
        borderBottom: '1px solid black',
    },
    tabPanelPaper: {
        padding: '20px',
    },
    questionAnswerCard: {
        marginBottom: '10px',
    },
}))

function Home(props) {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const classes = useStyles();
    const { unansweredIds, answeredIds } = props
    return (
        <Grid container direction='row' justify='center'>
            <Grid item xs={11} md={10} lg={8}>
                <Tabs className={classes.tabBar} centered={true} value={selectedTab} onChange={handleChange}>
                    <Tab label="Unanswered" />
                    <Tab label="Answered" />
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <Paper className={classes.tabPanelPaper}>
                        {unansweredIds.map((id) => (
                            <QuestionAnswerCard klassName={classes.questionAnswerCard} key={id} id={id} />
                        ))}
                    </Paper>
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <Paper className={classes.tabPanelPaper}>
                        {answeredIds.map((id) => (
                            <QuestionAnswerCard klassName={classes.questionAnswerCard} key={id} id={id} />
                        ))}
                    </Paper>
                </TabPanel>
            </Grid>
        </Grid>
    )    
}

function mapStateToProps({questions, users, authedUser}) {
    const answeredIds = Object.keys(users[authedUser].answers)

    return {
        answeredIds: Object.keys(questions)
            .filter((q) => answeredIds.includes(q))
            .sort((a, b) => questions[b].timestamp = questions[a].timestamp),
        unansweredIds: Object.keys(questions)
            .filter((q) => !answeredIds.includes(q))
            .sort((a, b) => questions[b].timestamp = questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Home)
