'use strict';
// @flow
import React from 'react';

type Props = { tasks: [] };
type State = { /* */ };

class App extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
  }

  render () {
    return (s
       <div className="page__container">
           <div id="root" className="page__container-view">
           </div>
       </div>
     )
  }
}

export default App;