import * as React from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import { Route, Link, Switch, RouteComponentProps, withRouter } from "react-router-dom";
import { Profile } from './Profile';

export class User extends React.Component<RouteComponentProps> {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Layout.Sider>
          <Menu theme={'light'} mode={'vertical'} selectedKeys={['quotes']}>
            <Menu.Item key={'user/profile'}>
              <Link to={`${match.url}/profile`}>My Proile</Link>
            </Menu.Item>
          </Menu>
        </Layout.Sider>
        <Link to={`${match.url}/profile`}>My Proile</Link>
        <Switch>
          <Route exact path={`${match.url}/profile`} component={Profile} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(User) as React.ComponentClass;