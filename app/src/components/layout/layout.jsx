import * as React from "react";
import { Navigation } from "..";

import './layout.scss';

export class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="col navigation">
                    <Navigation />
                </div>
                <div className="col content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
