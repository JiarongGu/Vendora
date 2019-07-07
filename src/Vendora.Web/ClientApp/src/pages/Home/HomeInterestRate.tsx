import { Button } from 'antd';
import * as React from 'react';
import * as styles from './Home.module.less';

export const HomeInterestRate = () => (
  <div className={`${styles.interestrateSection} ${styles.section}`}>
    <div className={styles.rateText}>
      <div className={styles.rateTextLeft}>
        <span>Home Loan Interest Rates</span>
        {/* <div>
          <Button size={'large'} type={'default'}>
            Calculate my home loan repayment
          </Button>
        </div> */}
      </div>
      <div className={styles.rateTextRight}>
        <div className={styles.rateFigure}>
          <span className={styles.number}>3.55</span>
          <span>%</span>
          <p className={styles.title}>Lorem Ipsum</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className={styles.rateFigure}>
          <span className={styles.number}>3.57</span>
          <span>%</span>
          <p className={styles.title}>Lorem Ipsum</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <p />
          <p />
        </div>
      </div>
    </div>
  </div>
);
