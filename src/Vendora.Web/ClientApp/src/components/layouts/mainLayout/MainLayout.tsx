import * as React from 'react';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/Breadcrumb';
import Menu from 'antd/lib/Menu';
import { Avatar, Dropdown, Icon, Divider } from 'antd';
import * as styles from './mainLayout.module.less';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Route, Link, Switch } from "react-router-dom";
import { sinking } from 'redux-sink';
import { NavigationSink } from '@sinks/navgation';

export interface MainLayoutProps {
  navigation: NavigationSink;
}

const accountMenu = (
  <div className={styles.dropdownMenu}>
    <button className={styles.dropdownItem}>Notifications<Icon type={'bell'}></Icon></button>
    <button className={styles.dropdownItem}>Profile<Icon type={'user'}></Icon></button>
    <button className={styles.dropdownItem}>Prefrences<Icon type={'setting'}></Icon></button>
    <hr />
    <button className={styles.dropdownItem}>Logout&nbsp;<Icon type={'logout'}></Icon></button>
  </div>
)

export class MainLayout extends React.PureComponent<MainLayoutProps> {
  render() {
    const { navigation } = this.props;
    const routes = navigation.layout.concat().sort((a, b) => b.path.localeCompare(a.path));

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
          
          <div className={classnames('right', styles.accountSection)}>
            <Dropdown overlay={accountMenu} placement={'bottomRight'}>
              <Avatar className={styles.accountSectionAvatar} size={40} icon={'user'} />
            </Dropdown>
            <Button>Login/Sign Up</Button>
          </div>
        </Layout.Header>

        <Layout.Content>
          <Switch>
            {routes.map(route =>
              <Route key={route.path} strict path={route.path} component={route.component} />
            )}
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