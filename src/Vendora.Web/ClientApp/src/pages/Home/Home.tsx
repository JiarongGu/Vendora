import { ContentService } from '@services/common/ContentService';
import Button from 'antd/lib/button';
import Carousel from 'antd/lib/carousel';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { sinking } from 'redux-sink';
import * as styles from './Home.module.less';

import Checkbox from 'antd/lib/checkbox/Checkbox';
import Input from 'antd/lib/input';

interface HomeProps {
  contentService: ContentService;
}

const fetchBanksImages = () => {
  const results: string[] = [];
  require
    .context('../../../public/assets/images/banks', false, /.*\.png$/)
    .keys()
    .forEach((key) => {
      results.push('/assets/images/banks'.concat(key.substr(1)));
    });
  return results;
};

const buildBankTemplate = (imagePath) => {
  return (
    <>
      <div className={styles.lender}>
        <img src={imagePath} />
      </div>
    </>
  );
};

const sortBank = (banks) => {
  const itemsPerPage = 10;
  const pages = Math.ceil(banks / itemsPerPage);
  const bankstemplate: any[][] = [];

  let col = 0;

  for (let i = 0; i < banks.length; i++) {
    if (i % itemsPerPage === 0 || i === 0) {
      const newCol = [buildBankTemplate(banks[i])];
      bankstemplate.push(newCol);
      col = bankstemplate.length - 1;
    } else {
      bankstemplate[col].push(buildBankTemplate(banks[i]));
    }
  }
  return bankstemplate;
};

function Home({ contentService }: HomeProps) {
  const whyusItems = [
    {
      title: 'Our Team',
      imagePath: '/assets/icons/team.png',
      desc:
        'Abacus Finance gathers professional mortgage brokers who always put the best interests of their customers first and are committed to maintaining an efficient and smooth loan process.'
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

  const banks = fetchBanksImages();
  const bankstemplate = sortBank(banks);
  let carousel: Carousel | null;
  const prev = () => {
    if (carousel) {
      carousel.prev();
    }
  };
  const next = () => {
    if (carousel) {
      carousel.next();
    }
  };
  return (
    <>
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
              individual customers with efficient service and excellent customer experience. We aim
              to build a financial brand, trusted by Australian loan customers.
            </p>
          </div>
        </div>
      </div>

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

      {/* <div className={`${styles.middleBannerSection} ${styles.section}`}>
        <div className={styles.back1}>
        </div>
      </div> */}
      <div className={`${styles.whyusSection} ${styles.section}`}>
        <div className={styles.whyusTitle}>
          <span className={styles.titleDot}>
            Why <span className={styles.highlight}>Abcus Finance</span>
          </span>
        </div>
        <div className={styles.whyusItemGroup}>
          {whyusItems.map((item, index) => (
            <div key={index} className={styles.whyusItem}>
              <div className={styles.whyusImage}>
                <img src={item.imagePath} />
              </div>
              <div className={styles.whyusText}>
                <div className={styles.whyusIndex}>
                  <span>0{index + 1}</span>
                </div>
                <div className={styles.whyusTextLeft}>
                  <span className={styles.titleDot}>{item.title}</span>
                </div>
                <div className={styles.whyusTextRight}>
                  <p className={styles.whyusDesc}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*customer review*/}
      <div className={`${styles.customerReviewSection} ${styles.section}`}>
        <div className={styles.grayPanel}>
          <div className={styles.grayPanelTitleLg}>What our customs say?</div>
          <div className={styles.grayPanelTitle}>
            <span className={styles.titleDot}>
              Client <span className={styles.highlight}>review</span>
            </span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
            </p>
          </div>

          <div className={styles.commentSection}>
            <div className={styles.commentSectionIcon}>
              <img src="/assets/icons/talk.svg" />
            </div>
            <Carousel
              dots={false}
              ref={(instance) => {
                carousel = instance;
              }}
            >
              <div>
                <div className={styles.commentSectionText}>
                  "Eden was amazing!!! From start to finish she was there to help. After we were
                  unconditional on our property Eden took it upon herself to ensure we had the
                  lowest interest rate and found us an even better deal."
                </div>
                <div className={styles.commentSectionAuthor}>Sam Witwicky</div>
              </div>
              <div>
                <div className={styles.commentSectionText}>
                  "Eden was amazing!!! From start to finish she was there to help. After we were
                  unconditional on our property Eden took it upon herself to ensure we had the
                  lowest interest rate and found us an even better deal."
                </div>
                <div className={styles.commentSectionAuthor}>Sam Witwicky</div>
              </div>
            </Carousel>
            <div className={styles.commentSectionNavButtons}>
              <span onClick={prev}>
                <img src="/assets/icons/previous.svg" />
              </span>
              <span onClick={next}>
                <img src="/assets/icons/next.svg" />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/*banks*/}
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
          {bankstemplate.map((page, index) => (
            <div key={index} className={styles.lenderBoardGroup}>
              {page.map((item) => item)}
            </div>
          ))}
        </Carousel>
      </div>

      {/*contact*/}
      <div className={`${styles.contactSection} ${styles.section}`}>
        <div className={styles.grayPanel}>
          <div className={styles.grayPanelTitleLg}>Community</div>
          <div className={styles.grayPanelTitle}>
            <span className={styles.titleDot}>Get in touch</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
            </p>
            <p className={styles.opentime}>
              {' '}
              We're available to help from Mon-Fri 8am-8pm (AEST/AEDT)
            </p>
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
              <span className={`${styles.titleDot} ${styles.title}`}>Let us call youl</span>
              <p>
                Leave your details and receive a call from a home loan specialist within 24 hours.
              </p>
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

      <div className={`${styles.newsletterSection} ${styles.section}`}>
        <div className={styles.newsletterSectionTitleLg}>Newsletter</div>
        <div className={styles.newsletterSectionTitle}>
          <span className={styles.titleDot}>
            What’s happening?
            <br /> Be the first to know
          </span>
          <p>Subscribe for insider info about our latest news, products, promotions and events.</p>
        </div>
        <div className={styles.newsletterInput}>
          <Input placeholder="Enter your email." />
          <Button size="large">Subscribe</Button>
          <Checkbox>
            By submitting your data and signing up to receive our news updates, you authoruse Abacus
            Finance to process it as described in the Terms and Privacy Policy.
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

export default sinking(ContentService)(Home) as React.FunctionComponent;
