import * as React from 'react';
import { Switch, Route } from 'react-router';
import { MainLayout } from '@components/Layouts';
import 'antd/dist/antd.less';
import '@styles/global.less';
import Home from '@components/Pages/Home';

export class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <MainLayout>
          <Route path='/' />
        </MainLayout>
      </Switch>
    )
  }
}