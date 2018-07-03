import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { restActions } from './rest_request.state';
import Editor from "../editor/editor";

import './rest_request.scss';

class RestRequestContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.setMethodBinded = this.setMethod.bind(this);
        this.setEndPointBinded = this.setEndPoint.bind(this);
        this.executeBinded = this.execute.bind(this);
    }

    setMethod(event) {
        this.props.setMethod(event.target.value);
    }

    setEndPoint(event) {
        this.props.setEndPoint(event.target.value);
    }

    execute() {
        if (this.props.request.endpoint && this.props.request.endpoint.indexOf('http') === 0) {
            this.props.execute();
        }
    }
    
    render() {
        return <div className="webapi-requests__container">
            <div className="webapi-requests__header">
                <div className="webapi-requests__header-execute">
                    <button className="btn btn-sm btn-outline-primary" onClick={this.executeBinded}>
                        <i className="fas fa-arrow-right" />
                    </button>
                </div>
                <div className="webapi-requests__header-method">
                    <span>Method:</span>
                    <select className="form-control" value={this.props.request.method} onChange={this.setMethodBinded}>
                        <option value="0">GET</option>
                        <option value="1">POST</option>
                        <option value="2">PUT</option>
                        <option value="3">DELETE</option>
                        <option value="4">HEAD</option>
                        <option value="5">CONNECT</option>
                        <option value="6">OPTIONS</option>
                        <option value="7">TRACE</option>
                        <option value="8">PATCH</option>
                    </select>
                </div>
                <div className="webapi-requests__header-url">
                    <span>URL:</span>
                    <input type='text' className="form-control" value={this.props.request.endpoint} onChange={this.setEndPointBinded} />
                </div>
                <div className="webapi-requests__header-save">
                    <button className="btn btn-sm btn-danger">
                        <i className="far fa-save" />
                    </button>
                </div>
            </div>
            <div className="webapi-requests__body">
                { this.props.response.statusCode > -1 ? ([
                <div key="0" className="webapi-requests__body-status-code">
                    <span>Status Code:</span>
                    <span>{this.props.response.statusCode}</span>
                </div>,
                <div key="1" className="webapi-requests__body-headers">
                    <span>Headers:</span>
                    <Editor language='text/yaml' value={this.props.response.headers} readOnly={true} />
                </div>,
                <div key="2" className="webapi-requests__body-content">
                    <span>Content:</span>
                    <Editor language="application/json" value={this.props.response.content} readOnly={true} />
                </div>]) : null
                }

            </div>
        </div>;
    }
}

export const RestRequest = connect(
    (state) => (state.restCall),
    (dispatch) => bindActionCreators(restActions, dispatch)
)(RestRequestContainer);
