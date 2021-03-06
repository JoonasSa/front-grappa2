export const getRequiredFields = (roles) => {
    if (roles === undefined)
        return [];
    let onlyRoles = roles.map((r) => r.role); //get only the role
    if (!onlyRoles.includes('supervisor') && onlyRoles[0] !== undefined) //TODO: remove when only student & supervisor can edit
        return [];
    if (onlyRoles[0] === undefined) {
        var role = 'student'; //if no role is defined then the user is a student
    } else {
        var role = 'supervisor';
    }
    return requiredField[role];
}

const requiredField = {
    'student': ['thesisTitle', 'thesisStartDate', 'thesisPerformancePlace', 'studyfieldId', 'thesisSupervisorMain', 'studentGradeGoal'],
    'supervisor': ['thesisWorkSupervisorTime', 'thesisWorkMeetingAgreement']
}
