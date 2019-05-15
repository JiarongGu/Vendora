import * as React from 'react';
import { CreateQuote } from './CreateQuote'; 
import { Switch, Route, Redirect } from 'react-router';

export default function (props) {
  return (
    <>
      <Switch>
          <Route key={'/quote/create'} strict path={'/quote/create'} component={CreateQuote} />
          <Route key={'/quote/:name'} strict path={'/quote/:name'} component={CreateQuote} />
          <Redirect from='/quote' to='/quote/create' />
      </Switch>
    </>
  );
}