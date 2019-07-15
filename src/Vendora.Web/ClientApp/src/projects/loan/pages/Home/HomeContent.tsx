import * as React from 'react';
import * as styles from './Home.module.less';
import { Button } from 'antd';

export const HomeContent = () => (
  <div className={`${styles.contentSection} ${styles.section}`}>
    <div className={styles.contentText}>
      <h1>
        “Integrity, Quality,
        <br />
        Focus and Reliance”
      </h1>
    </div>
    <div className={styles.infoGroup}>
      <div className={`${styles.infoCard} ${styles.left}`}>
        <div>
          <span className={`${styles.titleDot} ${styles.title}`}>
            What <span className={styles.highlight}>we do</span>
          </span>
        </div>
        <div>
          <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
            More About us
          </Button>
        </div>
      </div>
      <div className={`${styles.infoCard} ${styles.right}`}>
        <p>
          Established in 2004, Abacus Finance adheres to the brand philosophy of “Integrity,
          Quality, Focus and Reliance”, providing high-quality loan services to corporate and
          individual customers with efficient service and excellent customer experience. We aim to
          build a financial brand, trusted by Australian loan customers.
        </p>
      </div>
    </div>
  </div>
);
