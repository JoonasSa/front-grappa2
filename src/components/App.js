import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GraderEditor from './grader/GraderEditor';

const service = require("../util/apiConnection.js");

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "ennen kutsua"
        }
    }

    componentDidMount() {
        document.title = "Grappa: Main page";
    }

    handlePost = (e) => {
        e.preventDefault()
        let value = this.refs.input.value;
        service.get('/helloUser?username=' + value)
            .then(resp => {
                this.setState({
                    username: resp.data.text
                })
            }).catch((error) => console.error(error));
    }

    render() {
        return (
            <div className="App">

                <div className="ui inverted segment">
                    <h2>Enter your name below</h2>
                </div>

                <div className="ui segment">
                    <h2>{this.state.username}</h2>

                    <form onSubmit={this.handlePost}>
                        <div className="ui action input">
                            <input ref="input" placeholder="enter your name here" type="text" name="username" />
                            <button className="ui button" type="submit">Send</button>
                        </div>
                    </form>
                </div>

                <GraderEditor graders={[{title: "Dr.",
                                        name: "Nimi",
                                        id: 1},
                                        {title: "Prof.",
                                        name: "Nimi2",
                                        id: 2}]}/>

                <br />
                <p><Link to="/contract"> Go to contract page </Link></p>
                <p><Link to="/theses"> Go to thesis list page </Link></p>
            </div>


        );
    }
}

export default App;
