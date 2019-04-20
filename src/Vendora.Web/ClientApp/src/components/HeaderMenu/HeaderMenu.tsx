
import * as React from 'react';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router-dom';
import * as styles from './HeaderMenu.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie';

export const HeaderMenu = () => (
  <Menu theme={'light'} mode={'horizontal'} className={styles.container}>
    <Menu.Item>
      <Link to={'/'}>Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={'/quote'}>
        Talk to Expert <FontAwesomeIcon icon={faUserTie} />
      </Link>
    </Menu.Item>
  </Menu>
)