import * as React from "react";
import Editor from "../editor/editor";

export default class RestResponse extends React.Component {
    render() {
        return (<div className="webapi-requests__body">
            { this.props.statusCode > -1 ? ([
                <div key="0" className="webapi-requests__body-status-code">
                    <span>Status Code:</span>
                    <span>{this.props.statusCode}</span>
                </div>,
                <div key="1" className="webapi-requests__body-headers">
                    <span>Headers:</span>
                    <Editor language='text/yaml' value={this.props.headers} readOnly={true} />
                </div>,
                <div key="2" className="webapi-requests__body-content">
                    <span>Content:</span>
                    <Editor language="application/json" value={this.props.content} readOnly={true} />
                </div>]) : null
            }
        </div>);
    }
}
