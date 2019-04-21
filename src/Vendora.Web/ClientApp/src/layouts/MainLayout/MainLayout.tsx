import * as React from 'react';
import Layout from 'antd/lib/layout';
import { Route, Switch, Link } from 'react-router-dom';

import { Home, Quote, User } from '@pages';
import { Header } from './Header';

import * as styles from './MainLayout.module.less'; 

export class MainLayout extends React.Component {
  render() {
    return (
      <Layout className={styles.container}>
        <Header />
        <Layout.Content>
          <Switch>
            <Route key={'/user'} strict path={'/user'} render={() => <User />} />
            <Route key={'/quote'} strict path={'/quote'} render={() => <Quote />} />
            <Route key={'/'} strict path={'/'} render={() => <Home />} />
          </Switch>
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
          Footer
        </Layout.Footer>
      </Layout>
    );
  };
}

export default MainLayout;