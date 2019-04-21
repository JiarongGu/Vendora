import * as React from 'react';
import Layout from 'antd/lib/layout';
import { Route, Switch, Link } from 'react-router-dom';

import { Home, Quote, User } from '@pages';
import { Header } from './Header';

import * as styles from './MainLayout.module.less';
import { sinking } from 'redux-sink';
import { MainLayoutService } from './MainLayoutService';

export class MainLayout extends React.Component {
  render() {
    const { mainLayoutService } = this.props as any;
    return (
      <Layout className={styles.container}>
        <Header />
        <Layout.Content>
          <Switch>
            <Route key={'/user'} strict path={'/user'} component={User} />
            <Route key={'/quote'} strict path={'/quote'} component={Quote} />
            <Route key={'/'} strict path={'/'} component={Home} />
          </Switch>
        </Layout.Content>
        {mainLayoutService.footer && 
          <Layout.Footer className={styles.footer}>
            Footer
          </Layout.Footer>
        }
      </Layout>
    );
  };
}

export default sinking(MainLayoutService)(MainLayout);