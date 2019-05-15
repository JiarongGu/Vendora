import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import * as styles from './Home.module.less';
import Icon from 'antd/lib/icon';
import { ContentService } from '@services/common/ContentService';
import { Link } from 'react-router-dom';
import 'classnames';
interface HomeProps {
  contentService: ContentService;
}
function Home({ contentService }: HomeProps) {
 
  return (
    <>
      <div className={styles.mainSection}>
        <div className={styles.mainSectionButtonGroup}>
          <Link to={'/quote/buyinghome'}>
            <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              <Icon type={'home'} />
              我要买房
            </Button>
          </Link>
          <Link to={'/quote/refinance'}>
            <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              <Icon type={'dollar'} />
              我要融资
            </Button>
          </Link>
        </div>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.contentText}>
          <h1>无人爱苦，亦无人寻之欲之，乃因其苦...</h1>
          <hr/>
          <p>如今，很多桌面排版软件以及网页编辑用Lorem Ipsum作为默认的示范文本，搜一搜“Lorem Ipsum”就能找到这些网站的雏形。这些年来Lorem Ipsum演变出了各式各样的版本，有些出于偶然，有些则是故意的（刻意的幽默之类的）。</p>
        </div>
        <div className={styles.infoGroup}>
          <div className={styles.infoCard}>
            <div className={styles.infoImage}></div>
            <div className={styles.infoText}>
              <h2>什么是Lorem Ipsum?</h2>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoImage}></div>
            
            <div className={styles.infoText}>
              <h2>我们为何用它？</h2>
            </div>
            
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoImage}></div>
            
            <div className={styles.infoText}>
              <h2>它起源于哪里？</h2>
            </div>
            
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.infoImage}></div>
            <div className={styles.infoText}>
              <h2>我能从哪里获取？</h2>
            </div>
            
          </div>
        
        </div>
      </div>
      <div className={styles.interestrateSection}>
        <div className={styles.rateText}>
          最新优惠利率
        </div>
        <div className={styles.rateFigure}>
          <span>start from</span><span className={styles.number}>3.22</span><span>%</span>
        </div>
        <div className={styles.rateFigure}>
          <span>start from</span><span className={styles.number}>3.22</span><span>%</span>
        </div>
        
        <div className={styles.rateText}>
          <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              <Icon type={'dollar'} />
              更多利率
          </Button>
        </div>
      </div>
      <div className={styles.calculatorSection}>
        <div className={styles.calculatorTitle}>
          <h1>贷款利率计算器</h1>
        </div>
        <div className= {styles.calculatorItemGroup}>
          {[0,1,2,3,4,5].map((i) => (
          <div className={styles.calculatorItem}>
            <div className={styles.calculatorImage}>
              <img src="/assets/images/calculator.jpg" />
            </div>
            <div className={styles.calculatorText}>
              <h2>Credit Score Calculator</h2>
              <p>Are you a high risk borrower?</p>
              <Button className={styles.calculatorButton} size={'default'} type={'default'}>
                  了解更多
                  <Icon type={'arrow-right'} />
              </Button>
            </div>
          </div>))}
        </div>
      </div>
      <div className={styles.aboutUsSection}>
        <div className={styles.aboutUsTitle}>
          <h1>我们的团队</h1>
        </div>
        <div className={styles.aboutUsImage}></div>
        <div className={styles.aboutUsText}>
          由于住房市场低迷，与随之而来的金融市场危机对更广泛经济所造成的风险，是世界上许多中央银行降低利率伴随着政府经济刺激方案出台的主要因素。这些行动的目的是刺激经济增长并鼓舞大众对金融市场的信心。
        
          <p>
            <Button className={styles.aboutUsButton} size={'large'} type={'primary'}>
                了解更多
            </Button>
          </p>
        </div>
      </div>
      {/*banks*/}
      <div className={styles.lenderBoardSection}> 
        <div className={styles.lenderBoardGroup}>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((i) => {
            if (i % 3 === 1){
              return (
                <div className={styles.lender}>
                  <img src="/assets/images/lender.jpg" />
                </div>)
            } else if (i % 3 === 2){
              return (
                <div className={styles.lender}>
                  <img src="/assets/images/lender2.jpg" />
                </div>)
            } else {
              return (
                <div className={styles.lender}>
                  <img src="/assets/images/lender3.jpeg" />
                </div>)
            }
        })}
        </div>
      </div>
      <div className={styles.section} style={{background: '#5F0' }}>
        Articles
      </div>
    </>
  )
}

export default sinking(ContentService)(Home) as React.FunctionComponent;