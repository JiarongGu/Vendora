import { Layout } from 'antd';
import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { Home, Quote, User } from '@pages';

import { Footer } from '@components/Footer';
import { NavMenu } from '@components/NavMenu';
import { Enquiry } from '@pages/Enquiry';
import { MainLayoutService } from '@services/layouts/MainLayoutService';
import { string } from 'prop-types';
import { sinking } from 'redux-sink';
import * as styles from './MainLayout.module.less';

export class MainLayout extends React.PureComponent {
  public state = {activeClass: string};
  public componentDidMount() {
      window.addEventListener('scroll', (event) => {
        const layout: EventTarget = event.srcElement || new EventTarget();
        if (layout !== null) {
        }
        let navclass = '';
        if (true) {
          navclass = 'banner';
        } else {
          navclass = 'normal';
        }
        this.setState({
            activeClass: navclass
        });
      });
  }
  public render() {
    return (
      <Layout>
        <div className={`${styles.header} ${this.state.activeClass}`}>
          <Link to={'/'}>
            <div className={styles.logo} />
          </Link>
          <NavMenu />
        </div>
        <div id="main-layout" className={styles.body}>
          <div className={styles.headerBackground} />
          <Switch>
            <Route strict={true} path={'/user'} component={User} />
            <Route strict={true} path={'/quote'} component={Quote} />
            <Route strict={true} path={'/:language/enquiry/:name'} component={Enquiry} />
            <Route strict={true} path={'/'} component={Home} />
          </Switch>
          <Footer />
        </div>
      </Layout>
    );
  }
}

export default sinking(MainLayoutService)(MainLayout);
