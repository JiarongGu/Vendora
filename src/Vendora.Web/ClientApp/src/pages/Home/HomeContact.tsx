import * as React from 'react';
import * as styles from './Home.module.less';

export const HomeContact = () => (
  <div className={`${styles.contactSection} ${styles.section}`}>
    <div className={styles.grayPanel}>
      <div className={styles.grayPanelTitleLg}>Community</div>
      <div className={styles.grayPanelTitle}>
        <span className={styles.titleDot}>Get in touch</span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is
          simply dummy text of the printing and typesetting industry.
        </p>
        <p className={styles.openTime}> We're available to help from Mon-Fri 8am-8pm (AEST/AEDT)</p>
      </div>
      <div className={styles.contactItemGroup}>
        <div className={styles.contactItem}>
          <img src="/assets/icons/phone-call.svg" />
          <span className={`${styles.titleDot} ${styles.title}`}>Call us</span>
          <p>Got home loan questions or want to apply over the phone?</p>
          <p className={styles.action}>1300 26 86 86</p>
        </div>
        <div className={styles.contactItem}>
          <img src="/assets/icons/customer.svg" />
          <span className={`${styles.titleDot} ${styles.title}`}>Let us call you</span>
          <p>Leave your details and receive a call from a home loan specialist within 24 hours.</p>
          <p className={styles.action}>Get a call</p>
        </div>
        <div className={styles.contactItem}>
          <img src="/assets/icons/interview.svg" />
          <span className={`${styles.titleDot} ${styles.title}`}>Meet us</span>
          <p>One of our home loan specialists can visit at a time that works for you.</p>
          <p className={styles.action}>Book a time</p>
        </div>
      </div>
    </div>
  </div>
);
