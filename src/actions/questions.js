import { showLoading, hideLoading } from 'react-redux-loading'

import { _saveQuestion, _saveQuestionAnswer } from '../api/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function answerQuestion({qid, answer, authedUser}) {
    return {
        type: ANSWER_QUESTION,
        qid,
        answer,
        authedUser
    }
}

export function handleAnswerQuestion(info) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestionAnswer(info)
            .then(() => dispatch(answerQuestion(info)))
            .then(() => dispatch(hideLoading()))
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(info) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(info)
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}
