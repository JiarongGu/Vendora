import { Button, Checkbox, Input } from 'antd';
import * as React from 'react';
import * as styles from './Home.module.less';
import { HomeBanks } from './HomeBanks';
import { HomeContact } from './HomeContact';
import { HomeContent } from './HomeContent';
import { HomeCustomerReview } from './HomeCustomerReview';
import { HomeInformation } from './HomeInformation';
import { HomeIntroduction } from './HomeIntroduction';

class Home extends React.Component {
  public render() {
    return (
      <>
        <HomeInformation />

        <HomeContent />

        <div className={`${styles.interestrateSection} ${styles.section}`}>
          <div className={styles.rateText}>
            <div className={styles.rateTextLeft}>
              <span>Home Loan Interest Rates</span>
              <div>
                <Button size={'large'} type={'default'}>
                  Calculate my home loan repayment
                </Button>
              </div>
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

        <HomeIntroduction />

        <HomeCustomerReview />

        <HomeBanks />

        <HomeContact />

        <div className={`${styles.newsletterSection} ${styles.section}`}>
          <div className={styles.newsletterSectionTitleLg}>Newsletter</div>
          <div className={styles.newsletterSectionTitle}>
            <span className={styles.titleDot}>
              What’s happening?
              <br /> Be the first to know
            </span>
            <p>
              Subscribe for insider info about our latest news, products, promotions and events.
            </p>
          </div>
          <div className={styles.newsletterInput}>
            <Input placeholder="Enter your email." />
            <Button size="large">Subscribe</Button>
            <Checkbox>
              By submitting your data and signing up to receive our news updates, you authoruse
              Abacus Finance to process it as described in the Terms and Privacy Policy.
            </Checkbox>
          </div>
        </div>
        <div className={`${styles.socialSection}`}>
          <div className={styles.socialItem}>
            <img src="/assets/icons/facebook.svg" />
            <p>FACEBOOK</p>
            <span>abacusfinance.com.au</span>
          </div>
          <div className={styles.socialItem}>
            <img src="/assets/icons/wechat.svg" />
            <p>WECHAT</p>
            <span>abacusfinance.com.au</span>
          </div>
          <div className={styles.socialItem}>
            <img src="/assets/icons/email.svg" />
            <p>EMAIL</p>
            <span>info@abacusfinance.com.au</span>
          </div>
          <div className={styles.socialItem}>
            <img src="/assets/icons/youtube.svg" />
            <p>YOUTUBE</p>
            <span>info@abacusfinance.com.a</span>
          </div>
        </div>
      </>
    );
  }
}

export default Home as React.ComponentClass;
