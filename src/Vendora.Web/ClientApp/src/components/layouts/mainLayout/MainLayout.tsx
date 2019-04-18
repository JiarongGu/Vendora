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
          <Menu theme={'light'} mode={'horizontal'} style={{ lineHeight: '60px' }}>
            <Menu.Item key={'logo'} className={classnames(styles.logo, styles.menuItem)}>
              <Link to={'/'}>LOGO</Link>
            </Menu.Item>

            {navigation.layout.filter(route => route.display !== undefined).map((route, index) =>
              <Menu.Item key={index} className={styles.menuItem}>
                <Link to={route.path}>
                  {route.icon && <FontAwesomeIcon icon={route.icon} />}
                  {route.display}
                </Link>
              </Menu.Item>
            )}

            <Menu.Item key={'login'} className={classnames('right', styles.menuItem)}>
              <Button className={styles.menuItemButton}>Login/Sign Up</Button>
            </Menu.Item>

            <Menu.Item key={'user'} className={classnames('right', styles.menuItem)}>
              <Dropdown overlay={accountMenu} placement={'bottomRight'}>
                <Avatar className={styles.profileIcon} size={40} icon={'user'} />
              </Dropdown>
            </Menu.Item>
          </Menu>
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