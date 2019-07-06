import { Carousel } from 'antd';
import * as React from 'react';
import * as styles from './Home.module.less';

const fetchBanksImages = () => {
  const results: string[] = [];
  require
    .context('../../../public/assets/images/banks', false, /.*\.png$/)
    .keys()
    .forEach((key) => {
      results.push('/assets/images/banks'.concat(key.substring(1)));
    });
  return results;
};

const buildBankTemplate = (imagePath, i) => {
  return (
    <div className={styles.lender} key={i}>
      <img src={imagePath} />
    </div>
  );
};

const sortBank = (banks) => {
  const itemsPerPage = 10;
  const bankTemplates: any[][] = [];

  let col = 0;

  for (let i = 0; i < banks.length; i++) {
    if (i % itemsPerPage === 0 || i === 0) {
      const newCol = [buildBankTemplate(banks[i], i)];
      bankTemplates.push(newCol);
      col = bankTemplates.length - 1;
    } else {
      bankTemplates[col].push(buildBankTemplate(banks[i], i));
    }
  }
  return bankTemplates;
};

const banks = fetchBanksImages();
const bankTemplates = sortBank(banks);

export const HomeBanks = () => (
  <div className={`${styles.lenderBoardSection} ${styles.section}`}>
    <div className={styles.lenderBoardSectionTitle}>
      <span className={styles.titleDot}>
        Financial <span className={styles.highlight}>partner</span>
      </span>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is
        simply dummy text of the printing and typesetting industry.
      </p>
    </div>

    <Carousel>
      {bankTemplates.map((page, index) => (
        <div key={index} className={styles.lenderBoardGroup}>
          {page.map((item) => item)}
        </div>
      ))}
    </Carousel>
  </div>
);
