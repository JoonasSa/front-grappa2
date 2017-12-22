import React, { Component } from 'react';

import AssesmentInFinnish from '../../resources/assesmentInFinnish.json';
import AssesmentInEnglish from '../../resources/assesmentInEnglish.json';
import AssesmentInSwedish from '../../resources/assesmentInSwedish.json';

import { connect } from "react-redux";
import { updateStudyfield } from "../studyfield/studyfieldActions";
import { getPermissions } from "../../util/rolePermissions";

class AssesmentOfTheses extends Component {
    constructor() {
        super();
        this.state = {
            language: "en",
            extraInfo: "",
            canEdit: false,
            chosenStudyfield: -1
        }
    }

    /*
    TODO:
    * fix redux state fetching (probably in NavBar)
    * fix updating extra info, doesn't reach backend
    */

    componentWillReceiveProps(props) {
        this.setCanEdit(props);
    }

    setCanEdit = (props) => {
        if (props.user === undefined)
            return;
        let edit = this.state.canEdit;
        let role = (props.user.roles.length !== 0) ? props.user.roles[0].role : 'student';
        let permissions = getPermissions(role, 'thesis', 'edit');
        if (permissions !== undefined) {
            edit = permissions.indexOf('thesisGradingInfo') !== -1;
        }
        this.setState({ canEdit: edit });
    }

    changeLanguage = (lang, e) => {
        this.setState({ language: lang });
    }

    handleTextareaChange = (e) => {
        if (e.target.value) {
            this.setState({ extraInfo: e.target.value });
        }
    }

    updateExtraInfo = () => {
        //Doesn't work for some reason. I have no idea why...
        updateStudyfield({ studyfieldId: this.state.chosenStudyfield, thesisGradingInfo: this.state.extraInfo });
    }

    studyfieldChange = (e) => {
        let value = e.target.value;
        let text = (value != -1) ? this.props.studyfields.find(s => s.studyfieldId == value).thesisGradingInfo : "";
        this.setState({ chosenStudyfield: value, extraInfo: text });
    }

    renderSelecter() {
        let list = this.props.studyfields;
        if (list !== undefined) {
            return (
                <div>
                    <br />
                    <select className="ui dropdown" name="studyfieldId" onChange={this.studyfieldChange}>
                        <option value={-1}>Valitse tieteenala</option>
                        {list.map((obj, index) => {
                            return <option key={index} value={obj.studyfieldId}>{obj.name}</option>;
                        })}
                    </select>
                    <div className="ui section divider" />
                </div>
            );
        }
    }

    renderThesisExtraInfoTextarea() {
        switch (this.state.language) {
            case "fin":
                var label = "Lisäinformaatio";
                var extra = "Tällä aineella ei ole lisäinformaatiota.";
                break;
            case "en":
                var label = "Extra information";
                var extra = "This major doesn't have extra information.";
                break;
            case "swe":
                var label = "Extra information";
                var extra = "Det här skolämnet har ingen extra information.";
                break;
            default:
                var label = "Extra information";
                var extra = "";
        }
        if (this.state.chosenStudyfield != -1) {
            return (
                <div>
                    <h2>{label}</h2>
                    {(this.state.canEdit) ? this.editableExtraInfo() : ((this.state.extraInfo !== "") ? this.state.extraInfo : extra)}
                    <div className="ui section divider" />
                </div>
            );
        }
    }

    editableExtraInfo = () => {
        return (
            <div className="ui form" style={{fontSize: 15, fontWeight: "bold", flex: 1}}>
                <textarea type="text" value={ this.state.extraInfo } onChange={ this.handleTextareaChange } />
                <button className="ui fluid positive button" onClick={this.updateExtraInfo}>
                    Save
                </button>
            </div>
        );
    }

    renderAssesment() {
        let assesment = AssesmentInFinnish;
        if (this.state.language === "en") {
            assesment = AssesmentInEnglish;
        } else if (this.state.language === "swe") {
            assesment = AssesmentInSwedish;
        }
        return assesment.map((all, index) => (
            <div key={index}>
                <h2>{all.title}</h2>
                <p>{all.text}</p>
                <ul className="ui list">
                {all.list !== undefined && all.list.map((lista, index) =>
                    (<li key={index}><b>{lista.title}</b>{lista.text}</li>)
                )}
                </ul>
                <br />
            </div>
        ))
    }

    renderTitles() {
        if (this.state.language === "en") {
            return (<div>
                      <b>
                          UNIVERSITY OF HELSINKI<br />
                          2.8.2017<br />
                          Academic Affairs Council<br />
                          <h1>Assessment of Master’s theses included in second-cycle degrees</h1>
                      </b>
                  </div>);
        } else if (this.state.language === "swe") {
            return (<div>
                      <b>
                          HELSINGFORS UNIVERSITET<br />
                          2.8.2017<br />
                          Utbildningsrådet<br />
                          <h1>Bedömningen av pro gradu-avhandlingen som hör till högre högskoleexamen</h1>
                      </b>
                  </div>);
        }
        return (<div>
                  <b>
                      HELSINGIN YLIOPISTO<br />
                      2.8.2017<br />
                      Opintoasiainneuvosto<br />
                      <h1>Ylempään korkeakoulututkintoon sisältyvän pro gradu -tutkielman arviointi</h1>
                  </b>
              </div>);
    }

    render() {
        return (
            <div className="App">
                <div className="ui left aligned segment">
                    <button id="fin" className="ui button" onClick={(e) => this.changeLanguage("fin", e)}>suomeksi</button>
                    <button id="en" className="ui button" onClick={(e) => this.changeLanguage("en", e)}>in English</button>
                    <button id="swe" className="ui button" onClick={(e) => this.changeLanguage("swe", e)}>på svenska</button>
                    <p></p>
                    {this.renderTitles()}
                    {this.renderSelecter()}
                    {this.renderThesisExtraInfoTextarea()}
                    {this.renderAssesment()}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateStudyfield(data) {
        dispatch(updateStudyfield(data));
    }
});

const mapStateToProps = (state) => {
    return {
        studyfields: state.studyfields,
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssesmentOfTheses);
