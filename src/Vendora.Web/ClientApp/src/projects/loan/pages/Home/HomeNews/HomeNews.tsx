import { Button, Checkbox, Input } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { HomeContentSettings } from '../Home';
import * as sharedStyles from '../HomeShared.module.less';
import * as styles from './HomeNews.module.less';

interface HomeNewsProps {
  settings?: HomeContentSettings;
}

export const HomeNews = ({ settings }: HomeNewsProps) =>
  settings ? (
    <div className={classNames(styles.container, 'u-flex', 'u-flexColumn', 'u-flexSpaceBetween')}>
      <div className={styles.heading}>{settings.newsHeading}</div>
      <div className={styles.title}>
        <span className={sharedStyles.titleDot}>
          What’s happening?
          <br /> Be the first to know
        </span>
        <p>Subscribe for insider info about our latest news, products, promotions and events.</p>
      </div>
      <div className={styles.input}>
        <Input placeholder="Enter your email." />
        <Button size="large">Subscribe</Button>
        <Checkbox>
          By submitting your data and signing up to receive our news updates, you authoruse Abacus
          Finance to process it as described in the Terms and Privacy Policy.
        </Checkbox>
      </div>
    </div>
  ) : null;
