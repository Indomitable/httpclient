import React from 'react';
import { Route, Switch } from "react-router";
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';
import { Home } from './components';

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';

import './app.scss';

class AppContainer extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </ConnectedRouter>
    );
  }
}


const App = process.env.NODE_ENV === 'development' ? hot(module)(AppContainer) : AppContainer;
export default App;
