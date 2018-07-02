import * as React from "react";
import { Navigation } from "..";

import './layout.scss';

export class Layout extends React.Component {
    render() {
        return (
            <div className="hc-container">
                <div className="hc-col hc-navigation">
                    <Navigation />
                </div>
                <div className="hc-col content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
