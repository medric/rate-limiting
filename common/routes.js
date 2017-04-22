/*import { Route } from 'react-router';
import React from 'react';

import {App, TasksList} from '../app/components';

const routes = (
  <Route path="/" component={App}>
     <Route path="tasks" component={TasksList} />
  </Route>
)

export default routes;*/
import {App, TasksList} from '../app/components';

const routes = [
  { 
    path: '/',
    component: App,
    loadData: () => getSomeData(),
  },
]