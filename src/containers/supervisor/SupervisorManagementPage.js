import React, { Component } from 'react';
import { connect } from "react-redux";

import Review from "../../components/supervisor/Review.js";
import SupervisorEditor from "../../components/supervisor/SupervisorEditor.js"

export class SupervisorManagementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agreementPersons: [],
            personToBeReviewed: null,
            showReview: false
        }
    }

    componentDidMount() {
        this.props.getAgreementPersons(); //not a function -> undefined?
        document.title = "Supervisor Management";
    }

    handleSaveSupervisor = (supervisor) => {
        this.props.saveAddedSupervisor(supervisor);
    }

    handleUpdateSupervisor = (supervisor) => {
        this.props.updateSupervisor(supervisor);
    }

    handleDeleteSupervisor = (supervisor) => {
        this.props.deleteSupervisor(supervisor);
    }

    /*removeSupervisor = (supervisor) => (e) => {
        console.log("removed", supervisor);
        this.props.removeSupervisor(supervisor);
    }
    */

    toggleEditModal = (e, person) => {
        let newValue = !this.state.showReview;
        this.setState(
            {
                showReview: newValue,
                personToBeReviewed: person
            }
        );
    }
    
    renderReviewButton(person) {
        let text = "Review supervisor";
        let buttonClass = "ui green button";
        if (person.approved) {
            text = "Supervisor approved";
            buttonClass = "ui button";
        }
        return (
            <button key={person.personId} className={buttonClass} onClick={(e) => this.toggleEditModal(e, person)} >
                {text}
            </button>
        )
    }

    renderList() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Supervisor</th>
                        <th>Thesis</th>
                        <th>Action, if needed</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.supervisors.map((person, index) => //change index -> some id
                        <tr key={index}>
                            <td>{person.firstname} {person.lastname} studyfield: {person.studyfieldId}</td>
                            <td>{person.thesisTitle}</td>
                            <td>{this.renderReviewButton(person)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
    //TODO Known bugs: when reviewing/updating, one 'new supervisor' shows up in the list but it goes away when page refreshed...
    // should fix this by filtering redux state?
    render() {
        if (!this.props.supervisors) {
            return <div>nothing here</div>
        }
        return (
            <div className="ui segment">
                Add and edit supervisor list here or review thesis projects. This page will be displayed to studyfields' professors and admins only.
                <h2>List of thesis supervisors </h2>
                {this.renderList()}
                <Review showModal={this.state.showReview} closeModal={this.toggleEditModal} person={this.state.personToBeReviewed} reviewSupervisor={this.props.reviewSupervisor} />
                <h2>Edit supervisor list</h2>
                <SupervisorEditor saveSupervisor={this.handleSaveSupervisor} updateSupervisor={this.handleUpdateSupervisor} deleteSupervisor={this.handleDeleteSupervisor} supervisors={this.props.supervisors} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    /*saveAddedSupervisor(data) {
        dispatch(saveAddedSupervisor(data));
    },
    getSupervisors(data) {
        dispatch(getSupervisors());
    },
    getAgreementPersons(data) {
        dispatch(getAgreementPersons(data));
    },
    updateSupervisor(data) {
        dispatch(updateSupervisor(data));
    },
    deleteSupervisor(data) {
        dispatch(deleteSupervisor(data));
    },
    reviewSupervisor(data) {
        dispatch(reviewSupervisor(data));
    }*/
});

const mapStateToProps = (state) => {
    return {
        roles: state.roles,
        personToBeReviewed: state.persons
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupervisorManagementPage);