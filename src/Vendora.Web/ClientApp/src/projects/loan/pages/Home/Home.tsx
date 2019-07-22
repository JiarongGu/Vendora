import * as React from 'react';

import { HomeBanks } from './HomeBanks';
import { HomeContact } from './HomeContact';
import { HomeContent } from './HomeContent';
import { HomeCustomerReview } from './HomeCustomerReview';
import { HomeInformation } from './HomeInformation';
import { HomeInterestRate } from './HomeInterestRate';
import { HomeIntroduction } from './HomeIntroduction';
import { HomeNews } from './HomeNews';
import { HomeSocial } from './HomeSocial';

export interface HomeContentSettings {
  newsHeading?: string;
}

export default class Home extends React.PureComponent {
  public render() {
    return (
      <>
        <HomeInterestRate />
        <HomeBanks />
        {/* <HomeInformation /> */}
        <HomeContent />
        <HomeIntroduction />
        <HomeCustomerReview />
        <HomeContact />
        <HomeNews />
        <HomeSocial />
      </>
    );
  }
}
