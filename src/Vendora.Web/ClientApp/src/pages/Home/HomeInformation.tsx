import { Button } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Home.module.less';

export const HomeInformation = () => (
  <div className={`${styles.mainSection} ${styles.section}`}>
    <div className={styles.mainSectionTextGroup}>
      <h1 className={styles.mainSectionTitle}>
        The future
        <br />
        <span>is ours to shape</span>
      </h1>
      <p className={styles.mainSectionText}>
        For over 20 years, we’ve been changing the way the world uses technology.
      </p>
      <Link to={'/quote'}>
        <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
          Enquiry Now
        </Button>
      </Link>
    </div>
    <div className={styles.mainSectionBackground} />
  </div>
);
