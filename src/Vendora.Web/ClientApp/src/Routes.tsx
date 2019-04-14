import * as React from 'react';
import { Switch, Route } from 'react-router';
import { MainLayout } from '@components/Layouts';
import 'antd/dist/antd.less';
import '@styles/global.less';
import { Home } from '@components/Home';
import { User } from '@components/User';

export class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <MainLayout>
          <Route path="/" component={Home} />
          <Route path="/user" component={User} />
        </MainLayout>
      </Switch>
    );
  }
}
