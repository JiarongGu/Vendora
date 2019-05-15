import * as React from 'react';
import * as styles from './Footer.module.less';

export function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Main Sector</h1>
        <p>Home</p>
        <p>About Us</p>
        <p>Our Team</p>
        <p>Enquiry Online</p>
        <p>Contact Us</p>
      </div>
      <div>
        <h1>Calculator</h1>
      </div>
      <div>
        <h1>Resources</h1>
      </div>
      <div>
        <h1>About Us</h1>
      </div>
    </div>
  )
}