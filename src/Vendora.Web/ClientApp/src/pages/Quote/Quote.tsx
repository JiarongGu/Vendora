import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { CreateQuote } from './CreateQuote';

export default function(props) {
  return (
    <>
      <Switch>
        <Route key={'/quote/create'} strict={true} path={'/quote/create'} component={CreateQuote} />
        <Route key={'/quote/:name'} strict={true} path={'/quote/:name'} component={CreateQuote} />
        <Redirect from="/quote" to="/quote/create" />
      </Switch>
    </>
  );
}
