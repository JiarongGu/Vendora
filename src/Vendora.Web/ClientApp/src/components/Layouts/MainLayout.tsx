import * as React from 'react';
import Layout from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/Breadcrumb';
import Icon from 'antd/lib/Icon';
import Menu from 'antd/lib/Menu';
import * as styles from './mainLayout.module.less';

import { Link } from 'react-router-dom';
import { sinking } from 'redux-sink';
import { NavigationSink } from '@sinks/navgation';

export interface MainLayoutProps {
  navigation: NavigationSink;
}

export class MainLayout extends React.PureComponent<MainLayoutProps> {
  render() {
    const { children, navigation } = this.props;
    return (
      <Layout className={styles.container}>
        <Layout.Header className={'header'}>
          <div className={'logo'} />
          <Menu
            theme={'light'}
            mode={'horizontal'}
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            {navigation.layout.map(link =>
              <Menu.Item key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Layout.Header>
        <div>{children ? children : null}</div>
      </Layout>
    );
  }
}

export default sinking(NavigationSink)(MainLayout);