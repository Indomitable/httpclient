import React, { Component } from 'react';
const electron = window.require("electron")
const rest = electron.remote.require('./main/rest');

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: '',
            response: '',
            headers: '',
        };

        this.onInput = (event) => {
            this.setState({ ...this.state, endpoint: event.target.value });
        };

        this.onLoad = async () => {
            const res = await rest.get(this.state.endpoint);
            this.setState({
                ...this.state,
                response: res.content,
                headers: JSON.stringify(res.headers)
            });
        };
    }
    
    render() {
        return <div>
            <input type="text" value={this.state.endpoint} onChange={this.onInput} />
            <button onClick={this.onLoad}>LOAD</button>

            <textarea value={this.state.response} readOnly={true} cols={50} rows={20} />
            <textarea value={this.state.headers} readOnly={true}  cols={50} rows={20} />
        </div>;
    }
}
