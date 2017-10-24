import React, { Component } from "react";

import Dropzone from "react-dropzone";

export default class ThesisUploadWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
        }
    }

    componentWillReceiveProps(newProps) {
        console.log("newProps: " + JSON.stringify(newProps));
        if (newProps.currentFile) {
            console.log("IFFF");
            this.setState({ fileName: newProps.currentFile.name})
        }
        console.log("Tiedoston nimi " + this.state.fileName);
    }

    getLabel = () => {
        switch (this.props.type) {
            case "reviewFile":
                return "Upload Thesis review as PDF (max. 1 MB)";            
            case "abstractFile":
                return "Upload Thesis with abstract on 2nd page (max. 40 MB)";
            default:
                return "Error ThesisUploadWidget getLabel";
        }
    }

    onDrop = (files) => {
        console.log("FILU " + JSON.stringify(files[0]));
        console.log("filun nimi " + files[0].name);
        this.componentWillReceiveProps({currentFile: files[0]});
        this.props.sendChange(this.props.type, files[0]);
    }

    render() {
        return (
            <div className="field" style={{borderStyle: 'dashed'}}>
                <label>{this.getLabel()}</label>
                    <Dropzone className="field upload-box" onDrop={this.onDrop} multiple={false}>
                        <p className="upload-p">Click to navigate to the file or drop them from your file system.</p>
                        <p className="upload-p">Current file: {this.state.fileName}</p>
                    </Dropzone>
            </div>
        );
    }
}