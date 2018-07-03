import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { restActions } from './rest_request.state';

import RestResponse from "./rest_response";
import RestRequestUrlAndMethod from "./rest_request_header";

import './rest_request.scss';
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";

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
            <RestRequestUrlAndMethod {...this.props.request} execute={this.executeBinded} setMethod={this.setMethodBinded} setEndPoint={this.setEndPointBinded} />
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink>Request</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={true}>Response</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab='response'>
                    <TabPane tabId='request'>

                    </TabPane>
                    <TabPane tabId='response'>
                        <RestResponse {...this.props.response} />
                    </TabPane>
                </TabContent>
            </div>
        </div>;
    }
}

export const RestRequest = connect(
    (state) => (state.restCall),
    (dispatch) => bindActionCreators(restActions, dispatch)
)(RestRequestContainer);
