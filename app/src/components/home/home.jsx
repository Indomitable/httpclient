import React, { Component } from 'react';
const electron = window.require("electron")
const rest = electron.remote.require('./main/rest');

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: '',
            result: ''
        };

        this.onInput = (event) => {
            this.setState({ ...this.state, endpoint: event.target.value });
        };

        this.onLoad = async () => {
            const res = await rest.get(this.endpoint);
            this.setState({
                ...this.state,
                result: res
            });
        };
    }


    
    render() {
        return <div>
            <input type="text" value={this.state.endpoint} onChange={this.onInput} />
            <button onClick={this.onLoad}>LOAD</button>

            <textarea value={this.state.result} readOnly={true}  />
        </div>;
    }
}
