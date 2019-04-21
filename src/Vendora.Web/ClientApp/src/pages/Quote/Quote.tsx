import * as React from 'react';
import { CreateQuote } from './CreateQuote/CreateQuote'; 
import { Switch, Route, Redirect } from 'react-router';

export default function (props) {
  return (
    <div>
      Quote.tsx
      <Switch>
          <Route key={'/quote/create'} strict path={'/quote/create'} component={CreateQuote} />
          <Redirect from='/quote' to='/quote/create' />
      </Switch>
    </div>
  );
}