import * as React from 'react';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Breadcrumb from 'antd/lib/Breadcrumb';
import Menu from 'antd/lib/Menu';
import { Avatar, Dropdown, Icon, Divider } from 'antd';
import * as styles from './mainLayout.module.less';
import classnames from 'classnames';

import { Route, Link, Switch } from "react-router-dom";
import { sinking } from 'redux-sink';
import { NavigationSink } from '@sinks/navgation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';

export interface MainLayoutProps {
  navigation: NavigationSink;
}


export class MainLayout extends React.PureComponent<MainLayoutProps> {
  render() {
    const { navigation } = this.props;
    const routes = navigation.layout.concat().sort((a, b) => b.path.localeCompare(a.path));
    const dropdownItems = ['']

    const accountMenu = (
      <div className={styles.dropdownMenu}>
        <Link to={'/user/quotes'}>
          <button className={styles.dropdownItem}>
            Quotes
            <FontAwesomeIcon icon={faFile} />
          </button>
        </Link>
        <hr />
        <button className={styles.dropdownItem}>Logout&nbsp;<Icon type={'logout'}></Icon></button>
      </div>
    )
    return (
      <Layout className={styles.container}>
        <Layout.Header className={styles.header}>
          <div className={styles.headerLogo}>
            <h1 >LOGO</h1>
          </div>

          <Menu theme={'light'} mode={'horizontal'} className={styles.headerMenu}>
            {routes.filter(route => route.display !== undefined).map((route, index) =>
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
            {routes.map(route => <Route key={route.path} strict path={route.path} component={route.component}/> )}
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