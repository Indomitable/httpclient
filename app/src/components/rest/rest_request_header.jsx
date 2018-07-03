import * as React from "react";

export default class RestRequestUrlAndMethod extends React.Component {
    render() {
        return (<div className="webapi-requests__header">
            <div className="webapi-requests__header-execute">
                <button className="btn btn-sm btn-outline-primary" onClick={this.props.execute}>
                    <i className="fas fa-arrow-right" />
                </button>
            </div>
            <div className="webapi-requests__header-method">
                <span>Method:</span>
                <select className="form-control" value={this.props.method} onChange={this.props.setMethod}>
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
                <input type='text' className="form-control" value={this.props.endpoint} onChange={this.props.setEndPoint} />
            </div>
            <div className="webapi-requests__header-save">
                <button className="btn btn-sm btn-danger">
                    <i className="far fa-save" />
                </button>
            </div>
        </div>);
    }
}
