import * as React from 'react';
import * as styles from './HomeIntroduction.module.less';

const sections = [
  {
    title: 'Our Team',
    imagePath: '/assets/icons/team.png',
    desc: `Abacus Finance gathers professional mortgage brokers
       who always put the best interests of their customers
       first and are committed to maintaining an efficient and smooth loan process.`
  },
  {
    title: 'Our Experience',
    imagePath: '/assets/icons/work-team.png',
    desc: 'Abacus Finance gathers professional mortgage brokers who always put the best'
  },
  {
    title: 'Our Service Network',
    imagePath: '/assets/icons/connection.png',
    desc: 'Abacus Finance gathers professional mortgage brokers who always put the best'
  },
  {
    title: 'Our Lenders',
    imagePath: '/assets/icons/money.png',
    desc: 'Abacus Finance gathers professional mortgage brokers who always put the best'
  },
  {
    title: 'Our Results',
    imagePath: '/assets/icons/success.png',
    desc: 'Abacus Finance gathers professional mortgage brokers who always put the best'
  },
  {
    title: 'Our Process',
    imagePath: '/assets/icons/goal-1.png',
    desc: 'Abacus Finance gathers professional mortgage brokers who always put the best'
  }
];

export const HomeIntroduction = () => (
  <div className={styles.container}>
    <div className={styles.title}>
      <span className={styles.titleDot}>
        Why <span className={styles.highlight}>Abcus Finance</span>
      </span>
    </div>
    <div className={styles.section}>
      {sections.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.image}>
            <img src={item.imagePath} />
          </div>
          <div className={styles.text}>
            <div className={styles.index}>
              <span>0{index + 1}</span>
            </div>
            <div className={styles.textLeft}>
              <span className={styles.titleDot}>{item.title}</span>
            </div>
            <div className={styles.textRight}>
              <p className={styles.description}>{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
