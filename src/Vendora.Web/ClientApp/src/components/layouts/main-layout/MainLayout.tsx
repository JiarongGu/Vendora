import * as React from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/Menu';
import * as styles from './mainLayout.module.less';

import { Route, Link, Switch } from "react-router-dom";
import { sinking } from 'redux-sink';
import { NavigationSink } from '@sinks/navgation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AccountSection } from './account-section';

export interface MainLayoutProps {
  navigation: NavigationSink;
}

export class MainLayout extends React.PureComponent<MainLayoutProps> {
  render() {
    const { navigation } = this.props;
    const routes = navigation.layout.concat().sort((a, b) => b.path.localeCompare(a.path));
    const dropdownItems = ['']
    return (
      <Layout className={styles.container}>
        <Layout.Header className={styles.header}>
          <div className={styles.headerLogo}>
            <h1 >LOGO</h1>
          </div>

          <Menu theme={'light'} mode={'horizontal'} className={styles.headerMenu}>
            {navigation.layout.filter(route => route.display !== undefined).map((route, index) =>
              <Menu.Item key={index}>
                <Link to={route.path}>
                  {route.icon && <FontAwesomeIcon icon={route.icon} />}
                  {route.display}
                </Link>
              </Menu.Item>
            )}
          </Menu>

          <AccountSection />
        </Layout.Header>

        <Layout.Content>
          <Switch>
            {routes.map(route => <Route key={route.path} strict path={route.path} component={route.component} />)}
          </Switch>
        </Layout.Content>

        <Layout.Footer className={styles.footer}>
          Footer
        </Layout.Footer>
      </Layout>
    );
  };
}

export default sinking(NavigationSink)(MainLayout);