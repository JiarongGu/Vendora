import * as React from 'react';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Route, Link, Switch, RouteComponentProps } from "react-router-dom";
import { Profile } from './Profile';

const menuItems: Array<any> = [
  { path: 'profile', display: 'My Proile', component: Profile }
];

export default class User extends React.PureComponent {
  render() {
    const { match } = this.props as any;
    console.log(match);
    return (
      <Layout>
        <Layout.Sider>
          <Menu theme={'light'} mode={'vertical'} selectedKeys={['quotes']}>
            {menuItems.filter((item) => item.display).map(item =>
              <Menu.Item key={item.path}>
                <Link to={match.url + '/' + item.path}>{item.display}</Link>
              </Menu.Item>
            )}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <div>User Page</div>
          <Switch>
            <Route exact path={match.path} component={Profile} />
            {menuItems.map((item) =>
              <Route strict path={match.path + '/' + item.path} key={item.path} render={(props) => <item.component {...props} />} />
            )}
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}