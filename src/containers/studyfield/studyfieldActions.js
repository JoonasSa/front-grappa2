import { callController } from '../../util/apiConnection';

export const getStudyfields = () => {
    const route = '/studyfields';
    const prefix = "STUDYFIELD_GET_ALL_";
    return callController(route, prefix);
}

export const saveStudyfield = (studyfield) => {
    const route = '/studyfields';
    const prefix = "STUDYFIELD_SAVE_ONE_";
    const method = "post";
    return callController(route, prefix, studyfield, method);
}

export const updateStudyfield = (studyfield) => {
    const route = '/studyfields/' + studyfield.studyfieldId;
    const prefix = "STUDYFIELD_UPDATE_ONE_";
    const method = "put";
    return callController(route, prefix, studyfield, method);
}

export const deleteStudyfield = (studyfieldId) => {
    const route = '/studyfields/' + studyfieldId;
    const prefix = "STUDYFIELD_DELETE_ONE_";
    const method = "delete";
    return callController(route, prefix, studyfieldId, method);
}
