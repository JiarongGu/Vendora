import Layout from 'antd/lib/layout';
import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { Home, Quote, User } from '@pages';

import { Footer } from '@components/Footer';
import { NavMenu } from '@components/NavMenu';
import { MainLayoutService } from '@services/laytous/MainLayoutService';
import { sinking } from 'redux-sink';
import * as styles from './MainLayout.module.less';
import { string } from 'prop-types';

export class MainLayout extends React.PureComponent {
  state = {activeClass: string};
  componentDidMount(){
      window.addEventListener('scroll', (event) => {
        let layout: EventTarget = event.srcElement || new EventTarget();
        if (layout !== null){
        }
        let navclass = '';
        if(true){
          navclass = 'banner';
        }else{
          navclass = 'normal';
        }
        this.setState({
            activeClass: navclass
        })
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
            <Route key={'/user'} strict={true} path={'/user'} component={User} />
            <Route key={'/quote'} strict={true} path={'/quote'} component={Quote} />
            <Route key={'/'} strict={true} path={'/'} component={Home} />
          </Switch>
          <Footer />
        </div>
      </Layout>
    );
  }
}

export default sinking(MainLayoutService)(MainLayout);
