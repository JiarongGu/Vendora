import * as React from 'react';
import Layout from 'antd/lib/layout';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

import { Home, Quote, User } from '@pages';

import * as styles from './MainLayout.module.less';
import { sinking } from 'redux-sink';
import { MainLayoutService } from '@services/laytous/MainLayoutService';
import { Footer } from '@components/Footer';
import { NavMenu } from '@components/NavMenu';

export class MainLayout extends React.PureComponent {
  render() {
    return (
      <Layout>
        <div className={styles.header}>
          <Link to={'/'}>
            <div className={styles.logo}></div>
          </Link>
          <NavMenu/>
        </div>
        <div className={styles.body}>
          <div className={styles.headerBackground} />
          <Switch>
            <Route key={'/user'} strict path={'/user'} component={User} />
            <Route key={'/quote'} strict path={'/quote'} component={Quote} />
            <Route key={'/'} strict path={'/'} component={Home} />
          </Switch>
          <Footer />
        </div>
      </Layout>
    );
  };
}

export default sinking(MainLayoutService)(MainLayout);