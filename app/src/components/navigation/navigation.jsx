import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import './navigation.scss';

class NavigationContainer extends React.Component {
    render() {
        return (<nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-header">
                    Http Client
                </div>
                <div>
                    <ul className="navbar-items-container">
                        <li className="navbar-item">
                            <Link to={'/'} className={classNames('navbar-link', { 'navbar-link--active': this.props.currentPath === '/' })} >
                                <i className="fas fa-home" />
                                <span>Home</span>
                            </Link>
                            <Link to={'/webapi'} className={classNames('navbar-link', { 'navbar-link--active': this.props.currentPath === '/webapi' })} >
                                <i className="fas fa-home" />
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

