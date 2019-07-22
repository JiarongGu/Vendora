import { Layout } from 'antd';
import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { Enquiry, Home, User } from '@loan/pages';
import { Error404 } from '@loan/pages/Error/Error404';
import { Footer, NavMenu } from '@shared/components';
import { CommonSink } from '@shared/services/common';
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
  };
}

export default sinking(CommonSink)(MainLayout) as React.ComponentClass;
