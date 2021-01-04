import { ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'
import { RECEIVE_USERS } from '../actions/users'

export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_QUESTION:
            const { qid, answer, authedUser } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case ADD_QUESTION:
            const { question } = action
            const { author } = question
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([question.id])
                }
            }
        default:
            return state
    }
}
