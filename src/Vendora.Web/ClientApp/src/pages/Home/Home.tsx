import * as React from 'react';
import { sink, sinking, state, trigger } from 'redux-sink';

import { CommonSink } from '@services/common';
import { SettingService } from '@services/common/SettingService';
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

interface HomeProps {
  homeSink: HomeSink;
}

@sink('homeSink', CommonSink)
class HomeSink {
  @state public settings: HomeContentSettings = {};

  constructor(private commonSink: CommonSink) {}

  @trigger('commonSink/settings')
  public async updateSettings(setting: SettingService) {
    if (this.commonSink.pathname === '') {
      this.settings = await setting.get('home');
    }
  }
}

class Home extends React.PureComponent<HomeProps> {
  public render() {
    const {
      homeSink: { settings }
    } = this.props;

    return (
      <>
        <HomeInterestRate />
        <HomeBanks />
        {/* <HomeInformation /> */}
        <HomeContent />
        <HomeIntroduction />
        <HomeCustomerReview />
        <HomeContact />
        <HomeNews settings={settings} />
        <HomeSocial />
      </>
    );
  }
}

export default sinking(HomeSink)(Home) as React.ComponentClass;
