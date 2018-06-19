import React from 'react';
import { Route, Switch } from "react-router";
import { Home } from './components';

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';

import './app.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;

