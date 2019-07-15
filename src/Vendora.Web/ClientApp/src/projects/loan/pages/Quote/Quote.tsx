import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { CreateQuote } from './CreateQuote';

export default function(props) {
  return (
    <>
      <Switch>
        <Route key={'/:language/quote/create'} exact={true} path={'/:language/quote/create'} component={CreateQuote} />
        <Redirect exact={true} from="/:language/quote" to="/:language/quote/create" />
      </Switch>
    </>
  );
}
