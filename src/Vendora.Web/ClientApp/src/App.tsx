import * as React from 'react';
import { Switch, Route } from 'react-router';
import { MainLayout } from '@components/Layouts';
import 'antd/dist/antd.less';
import '@styles/global.less';
import { sinking } from 'redux-sink';
import { NavigationSink } from '@sinks/navgation';


export const App = ({ navigation }: { navigation: NavigationSink }) => (
  <MainLayout>
    <Switch>
      {navigation.state.layout.concat().sort((a, b) => b.path.localeCompare(a.path)).map(route =>
        <Route key={route.path} strict path={route.path} component={route.component} />
      )}
    </Switch>
  </MainLayout>
);

export default sinking(NavigationSink)(App);
