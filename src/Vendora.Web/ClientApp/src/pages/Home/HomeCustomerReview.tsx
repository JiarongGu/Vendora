import { Carousel } from 'antd';
import * as React from 'react';

import * as classNames from 'classnames';
import * as styles from './HomeCustomerReview.module.less';
import * as sharedStyles from './HomeShared.module.less';

export const HomeCustomerReview = () => {
  let carousel: Carousel | null;

  return (
    <div className={classNames(styles.container, 'u-flex', 'u-flexCenter')}>
      <div className={sharedStyles.grayPanel}>
        <div className={sharedStyles.grayPanelTitleLg}>What our customs say?</div>
        <div className={sharedStyles.grayPanelTitle}>
          <span className={sharedStyles.titleDot}>
            Client <span className={sharedStyles.highlight}>review</span>
          </span>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className={styles.comment}>
          <div className={styles.commentIcon}>
            <img src="/assets/icons/talk.svg" />
          </div>
          <Carousel
            dots={false}
            ref={(instance) => {
              carousel = instance;
            }}
          >
            <div>
              <div className={styles.commentText}>
                "Eden was amazing!!! From start to finish she was there to help. After we were
                unconditional on our property Eden took it upon herself to ensure we had the lowest
                interest rate and found us an even better deal."
              </div>
              <div className={styles.commentAuthor}>Sam Witwicky</div>
            </div>
            <div>
              <div className={styles.commentText}>
                "Eden was amazing!!! From start to finish she was there to help. After we were
                unconditional on our property Eden took it upon herself to ensure we had the lowest
                interest rate and found us an even better deal."
              </div>
              <div className={styles.commentAuthor}>Sam Witwicky</div>
            </div>
          </Carousel>
          <div className={styles.commentButtons}>
            <span onClick={() => carousel && carousel.prev()}>
              <img src="/assets/icons/previous.svg" />
            </span>
            <span onClick={() => carousel && carousel.next()}>
              <img src="/assets/icons/next.svg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
