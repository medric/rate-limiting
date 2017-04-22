'use strict';
// @flow
import React from 'react';
import {Switch, Route} from 'react-router';

type Props = { tasks: [] };
type State = { /* */ };

/*class App extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
  }

  render () {
    return (
       <div className="page__container">
           <div id="root" className="page__container-view">
           </div>
       </div>
     )
  }
}

export default App;*/

import { routes } from '../../common/routes'

const App = () => (
  <Switch>
    {routes.map(route => (
      <Route {...route}/>
    ))}
  </Switch>
)

