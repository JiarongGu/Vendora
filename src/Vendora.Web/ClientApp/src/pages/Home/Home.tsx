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
          <hr />
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
        <div className={styles.calculatorItemGroup}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div className={styles.calculatorItem}>
              <div className={styles.calculatorImage}>
                <img src={'/images/calculator.jpg'} />
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => {
            if (i % 3 === 1) {
              return (
                <div className={styles.lender} key={i}>
                  <img src="/assets/images/lender.jpg" />
                </div>)
            } else if (i % 3 === 2) {
              return (
                <div className={styles.lender} key={i}>
                  <img src="/assets/images/lender2.jpg" />
                </div>)
            } else {
              return (
                <div className={styles.lender} key={i}>
                  <img src="/assets/images/lender3.jpeg" />
                </div>)
            }
          })}
        </div>
      </div>
      <div className={styles.articleSection}>
        <div className={styles.articleTitle}>
          <h1>相关阅读</h1>
        </div>
        <div className={styles.articleGroup}>
          <div className={styles.article}>
            <Link className={styles.viewMore} to="">阅读更多</Link>
            <p>美国房地产贷款系统里面分为三类：优质贷款市场、次优级贷款市场、次级贷款市场。美国把消费者的信用等级分为优级、次优级和次级。那些能够按时付款的消费者的信用级别被定为优级，那些不能按时付款的消费者的信用级别被定为次级。次级贷款市场就是面向那些收入信誉程度不高的客户，其贷款利率通常比一般抵押贷款高出2%～3%。尽管美国次级贷款市场所占美国整体房贷市场比重并不大，大约占7%～8%，但其利润最高，风险最大。</p></div>
          <div className={styles.article}>

            <Link className={styles.viewMore} to="">阅读更多</Link>
            次贷危机是伴随着大约于2005-2006年的美国房地产泡沫破灭，[2][3]以及“次级贷款”与可调整利率贷款（Adjustable Rate Mortgage，下简称ARM）的高违约率而开始的。在危机发生前几年的政府政策和竞争压力助长了高风险贷款的实施。[4][5]此外，对贷款奖励力度的增加，如轻松的头期款以及房价长期上涨的趋势让借款人相信偿还房贷抵押的艰苦只是暂时性，他们能够在未来迅速的找到更有利的融资条件。然而，一旦利率开始回升，房地产价格于2006-2007年在美国许多地区开始适度下降，再融资变得更加困难。违约与法拍活动在轻松头期过后急剧增加，房屋价格并没有如预期般上升，以及ARM利率再创新高。在2006年年底美国法拍步调加速，引发后续的环球金融危机。在2007年期间，近130万房地产遭到法拍，比起2006年增长79％。</div>
          <div className={styles.article}>

            <Link className={styles.viewMore} to="">阅读更多</Link>
            由于住房市场低迷，与随之而来的金融市场危机对更广泛经济所造成的风险，是世界上许多中央银行降低利率伴随着政府经济刺激方案出台的主要因素。这些行动的目的是刺激经济增长并鼓舞大众对金融市场的信心。此危机对全球股市的影响已经相当戏剧性。从2008年1月1日至10月11日为止，美国企业股票持有人随着总市值20兆下调至12兆美元，蒙受了约8兆美元的损失。在其他国家的损失幅度平均为40％左右。[10]股票市场的损失和住房价值下降进一步压缩消费者开支预算，而这个是经济引擎的一个重要环节。[11]较大的已开发及新兴国家的领导人已在2008年11月高峰会制定策略，以解决这场危机。</div>
          <div className={styles.article}>

            <Link className={styles.viewMore} to="">阅读更多</Link>
            次级贷款是贷款的实现，主要形式是将购买住宅时的抵押贷款，以最低的借贷市场利率贷给不符一般贷款标准的借款人。这些标准涉及到借款人的信用评级、信用记录和其他种种因素。[1]如果借款人在偿还抵押贷款的按时付款给贷款服务商（如银行或其他金融机构）时拖欠，贷款人可以依贷款里的实收款项依法占有房产所有权，这个过程被称做法拍。</div>
        </div>
      </div>
    </>
  )
}

export default sinking(ContentService)(Home) as React.FunctionComponent;