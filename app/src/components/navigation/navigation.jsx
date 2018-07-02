import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import './navigation.scss';

class NavigationContainer extends React.Component {
    render() {
        return (<nav className="hc-navbar">
            <div className="hc-navbar-content">
                <div className="hc-navbar-header">
                    Http Client
                </div>
                <div>
                    <ul className="hc-navbar-items-container">
                        <li className="hc-navbar-item">
                            <Link to={'/webapi'} className={classNames('hc-navbar-link', { 'hc-navbar-link--active': this.props.currentPath === '/webapi' })} >
                                <i className="fas fa-sitemap" />
                                <span>REST</span>
                            </Link>
                        </li>               
                    </ul>
                </div>
            </div>
        </nav>);
    }
}


const mapStateToProps = (state) => ({
    currentPath: state.router.location ? state.router.location.pathname : '/'
});

export const Navigation = connect(mapStateToProps)(NavigationContainer);

