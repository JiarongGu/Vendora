import * as React from 'react';
import * as styles from './HomeSocial.module.less';

const socials = [
  { name: 'facebook', url: 'abacusfinance.com.au' },
  { name: 'wechat', url: 'abacusfinance.com.au' },
  { name: 'email', url: 'abacusfinance.com.au' },
  { name: 'youtube', url: 'abacusfinance.com.au' }
];

export const HomeSocial = () => (
  <div className={`${styles.container}`}>
    {socials.map((social) => (
      <div key={social.name} className={styles.item}>
        <img src={`/assets/icons/${social.name}.svg`} />
        <p>{social.name.toUpperCase()}</p>
        <span>{social.url}</span>
      </div>
    ))}
  </div>
);
