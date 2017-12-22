import { callApi } from '../../util/apiConnection';

export const getEmailDrafts = () => {
    const prefix = "GET_ALL_";
    const method = "get";
    return callController(prefix, method);
}

export const saveEmailDraft = (emailDraft) => {
    const prefix = "SAVE_ONE_";
    const method = "post";
    return callController(prefix, method, emailDraft);
}

export const updateEmailDraft = (emailDraft) => {
    const prefix = "UPDATE_ONE_";
    const method = "put";
    return callController(prefix, method, emailDraft);
}

export const deleteEmailDraft = (emailDraftId) => {
    const prefix = "DELETE_ONE_";
    const method = "delete";
    const route = "/emaildrafts/" + emailDraftId;
    return callController(prefix, method, emailDraftId, route);
}

export const sendReminder = (thesisId, emailType) => {
    const prefix = "SEND_REMINDER_";
    const method = "post";
    const route = "email"
    return callController(prefix, method, { thesisId, emailType }, route)
}

const action = (suffix, response) => {
    return {
        type: "EMAILDRAFT_" + suffix,
        response,
    }
}

//only place where this is called like this => refactor?
const callController = (prefix, method, data, route = "/emaildrafts") => (dispatch) => {
    dispatch(action(prefix + "ATTEMPT"));
    callApi(route, method, data)
        .then(res => dispatch(action(prefix + "SUCCESS", res)))
        .catch(err => dispatch(action(prefix + "FAILURE", err.response)));
}
