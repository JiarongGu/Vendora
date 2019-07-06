import { Layout } from 'antd';
import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { Home, Quote, User } from '@pages';

import { Footer } from '@components/Footer';
import { NavMenu } from '@components/NavMenu';
import { Enquiry } from '@pages/Enquiry';
import { Error404 } from '@pages/Error/Error404';
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
    window.addEventListener('scroll', this.scrollEvent);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent);
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
        <div id={'main-layout'} className={styles.body}>
          <div className={styles.headerBackground} />
          <Switch>
            <Route strict={true} path={`/${commonSink.languageRegex}/user`} component={User} />
            <Route strict={true} path={`/${commonSink.languageRegex}/quote`} component={Quote} />
            <Route
              exact={true}
              path={`/${commonSink.languageRegex}/enquiry/:name`}
              component={Enquiry}
            />
            <Route exact={true} path={[`/${commonSink.languageRegex}`, '/']} component={Home} />
            <Route path={'*'} component={Error404} />
          </Switch>
          <Footer />
        </div>
      </Layout>
    );
  }

  private scrollEvent = (event: any) => {
    const layout: EventTarget = event.srcElement || new EventTarget();
    this.setState({
      activeClass: 'banner'
    });
  }
}

export default sinking(MainLayoutSink, CommonSink)(MainLayout) as React.ComponentClass;
