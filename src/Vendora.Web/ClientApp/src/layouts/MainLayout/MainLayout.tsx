import { Layout } from 'antd';
import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { Home, Quote, User } from '@pages';

import { Footer } from '@components/Footer';
import { NavMenu } from '@components/NavMenu';
import { Enquiry } from '@pages/Enquiry';
import { CommonSink } from '@services/common';
import { MainLayoutSink } from '@services/layouts/MainLayoutSink';
import { string } from 'prop-types';
import { sinking } from 'redux-sink';
import * as styles from './MainLayout.module.less';

interface MainLayoutProps {
  commonSink: CommonSink;
}

export class MainLayout extends React.PureComponent<MainLayoutProps> {
  public state = { activeClass: string };
  public componentDidMount() {
    window.addEventListener('scroll', (event) => {
      const layout: EventTarget = event.srcElement || new EventTarget();
      this.setState({
        activeClass: 'banner'
      });
    });
  }
  public render() {
    const { commonSink } = this.props;
    return (
      <Layout>
        <div className={`${styles.header} ${this.state.activeClass}`}>
          <Link to={'/'}>
            <div className={styles.logo} />
          </Link>
          <NavMenu language={commonSink.language} pathname={commonSink.pathname} />
        </div>
        <div id="main-layout" className={styles.body}>
          <div className={styles.headerBackground} />
          <Switch>
            <Route strict={true} path={'/:language/user'} component={User} />
            <Route strict={true} path={'/:language/quote'} component={Quote} />
            <Route strict={true} path={'/:language/enquiry/:name'} component={Enquiry} />
            <Route strict={true} path={['/:language', '/']} component={Home} />
          </Switch>
          <Footer />
        </div>
      </Layout>
    );
  }
}

export default sinking(MainLayoutSink, CommonSink)(MainLayout) as React.ComponentClass;
