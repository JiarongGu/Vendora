import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { Home } from '@pages/Home';
import { Quote } from '@pages/Quote';
import { User } from '@pages/User';
import { HeaderMenu } from './HeaderMenu';
import classnames from 'classnames';
import * as styles from './MainLayout.module.less';
import { DropdownMenu } from '@components/DropdownMenu';
import Avatar from 'antd/lib/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from 'antd/lib/icon';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';


export default class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <div className={classnames('.ant-menu-horizontal', styles.header)}>
          <div className={styles.headerLogo}>
            <h1 >LOGO</h1>
          </div>
          <HeaderMenu />
          <DropdownMenu display={<Avatar className={styles.userAvatar} size={40} icon={'user'} />}>
            <Link to={'/user'}>
              <button className={styles.dropdownItem}>
                Quotes<FontAwesomeIcon icon={faFile} />
              </button>
            </Link>
            <hr />
            <button className={styles.dropdownItem}>Logout&nbsp;<Icon type={'logout'}></Icon></button>
          </DropdownMenu>
        </div>

        <Switch>
          <Route key={'/user'} strict path={'/user'} render={(match) => <User { ...match } />} />
          <Route key={'/quote'} strict path={'/quote'} render={() => <Quote />} />
          <Route key={'/'} strict path={'/'} render={() => <Home />} />
        </Switch>
      </div>
    );
  };
}