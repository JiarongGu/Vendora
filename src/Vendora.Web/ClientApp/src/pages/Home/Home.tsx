import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import { ContentService } from '@services/content';
import * as styles from './Home.module.less';
import Icon from 'antd/lib/icon';
import { MainLayoutService } from '@layouts/MainLayout/MainLayoutService';
import { Link } from 'react-router-dom';
import { MenuLink } from '@components/Link';

interface HomeProps {
  contentService: ContentService;
  mainLayoutService: MainLayoutService;
}

function Home({ contentService, mainLayoutService }: HomeProps) {
  React.useEffect(() => mainLayoutService.displayFooter(false));
  return (
    <>
      <div className={styles.mainSection}>
        <div className={styles.mainSectionButtonGroup}>
          <MenuLink to={'/quote/buyinghome'}>
            <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              <Icon type={'home'} />
              我要买房
            </Button>
          </MenuLink>
          <MenuLink to={'/quote/refinance'}>
            <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              <Icon type={'dollar'} />
              我要融资
            </Button>
          </MenuLink>
        </div>
      </div>
      <div className={styles.lenderBoard}>
        Banks
      </div>
    </>
  )
}

export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;