import * as React from 'react';
import * as styles from './account-section.module.less';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import Icon from 'antd/lib/icon';


export const AccountDropdownMenu = () => (
  <div className={styles.dropdown}>
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