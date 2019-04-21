import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import { ContentService } from '@services/content';
import * as styles from './Home.module.less';
import Icon from 'antd/lib/icon';
import { MainLayoutService } from '@layouts/MainLayout/MainLayoutService';

interface HomeProps {
  contentService: ContentService;
  mainLayoutService: MainLayoutService;
}

function Home({ contentService, mainLayoutService }: HomeProps) {
  mainLayoutService.displayFooter(false);
  
  return (
    <>
      <div className={styles.mainSection}>
        <Button type={'primary'}>
          <Icon type={'home'} />
          我要买房
        </Button>
        <Button type={'primary'}>
          <Icon type={'dollar'} />
          融资
        </Button>
      </div>
    </>
  )
}

export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;