import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import * as styles from './Home.module.less';
import Icon from 'antd/lib/icon';
import { ContentService } from '@services/common/ContentService';
import { Link } from 'react-router-dom';
import Carousel from 'antd/lib/carousel';

import 'classnames';
interface HomeProps {
  contentService: ContentService;
}
const sortBank = function (banks) {
  const itemsPerPage = 8, pages = Math.ceil(banks / itemsPerPage);
  let bankstemplate = [];
  for (let i = 0; i < banks.length; i++) {
    if (i % 8 === 0 || i === 0) {

    }
  }
}
function Home({ contentService }: HomeProps) {

  const whyusItems = [
    { title: 'Our Team', imagePath: '', desc: "Abacus Finance gathers professional mortgage brokers who always put the best interests of their customers first and are committed to maintaining an efficient and smooth loan process." },
    { title: 'Our Experience', imagePath: '', desc: "Abacus Finance gathers professional mortgage brokers who always put the best" },
    { title: 'Our Service Network', imagePath: '', desc: "Abacus Finance gathers professional mortgage brokers who always put the best" },
    { title: 'Our Lenders', imagePath: '', desc: "Abacus Finance gathers professional mortgage brokers who always put the best" },
    { title: 'Our Results', imagePath: '', desc: "Abacus Finance gathers professional mortgage brokers who always put the best" },
    { title: 'Our Process', imagePath: '', desc: "Abacus Finance gathers professional mortgage brokers who always put the best" },

  ];


  return (
    <>
      <div className={`${styles.mainSection} ${styles.section}`}>
        <div className={styles.mainSectionTextGroup}>
          <h1 className={styles.mainSectionTitle}>The future<br /><span>is ours to shape</span></h1>
          <p className={styles.mainSectionText}>For over 20 years, we’ve been changing the way the world uses technology.</p>
          <Link to={'/quote'}>
            <Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              Enquiry Now
            </Button>
          </Link>
        </div>
        <div className={styles.mainSectionBackground}></div>
      </div>


      <div className={`${styles.contentSection} ${styles.section}`}>
        <div className={styles.contentText}>
          <h1>“Integrity, Quality,<br />Focus and Reliance”</h1>
        </div>
        <div className={styles.infoGroup}>
          <div className={`${styles.infoCard} ${styles.left}`}>
            <div><span className={`${styles.titleDot} ${styles.title}`}>What <span className={styles.highlight}>we do</span></span></div>
            <div><Button className={styles.mainSectionButton} size={'large'} type={'primary'}>
              More About us
            </Button></div>
          </div>
          <div className={`${styles.infoCard} ${styles.right}`}>
            <p>Established in 2004, Abacus Finance adheres to the brand philosophy of “Integrity, Quality, Focus and Reliance”, providing high-quality loan services to corporate and individual customers with efficient service and excellent customer experience. We aim to build a financial brand, trusted by Australian loan customers.</p>
          </div>
        </div>
      </div>

      <div className={`${styles.middleBannerSection} ${styles.section}`}>
        <div className={styles.back1}>
        </div>
      </div>
      <div className={`${styles.whyusSection} ${styles.section}`}>
        <div className={styles.whyusTitle}>
          <span className={styles.titleDot}>Why <span className={styles.highlight}>Abcus Finance</span></span>
        </div>
        <div className={styles.whyusItemGroup}>
          {whyusItems.map((item, index) => (
            <div className={styles.whyusItem}>
              <div className={styles.whyusImage}>
                <img src={item.imagePath} />
              </div>
              <div className={styles.whyusText}>
                <div className={styles.whyusIndex}>
                  <span>0{index + 1}</span>
                </div>
                <div className={styles.whyusTextLeft}><span className={styles.titleDot}>{item.title}</span></div>
                <div className={styles.whyusTextRight}><p className={styles.whyusDesc}>{item.desc}</p></div>
              </div>
            </div>))}
        </div>
      </div>

      <div className={`${styles.interestrateSection} ${styles.section}`}>
        <div className={styles.rateText}>
          <div className={styles.rateTextLeft}>
            <span>Home Loan Interest Rates</span>
            <div><Button size={'large'} type={'default'}>Calculate my home loan repayment</Button></div>
          </div>
          <div className={styles.rateTextRight}>

            <div className={styles.rateFigure}>
              <span className={styles.number}>3.55</span><span>%</span>
              <p className={styles.title}>Lorem Ipsum</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className={styles.rateFigure}>
              <span className={styles.number}>3.57</span><span>%</span>
              <p className={styles.title}>Lorem Ipsum</p>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.aboutUsSection} ${styles.section}`}>
      </div>
      {/*banks*/}
      <div className={`${styles.lenderBoardSection} ${styles.section}`}>
        <div className={styles.lenderBoardSectionTitle}>
          <span className={styles.titleDot}>Financial <span className={styles.highlight}>partner</span></span>
        </div>
        <div className={styles.lenderBoardGroup}>
          <Carousel>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i =>
              <div className={styles.lender} key={i}>
                <img src="/assets/images/lender.jpg" />
              </div>
            )}
          </Carousel>
        </div>
      </div>
      <div className={`${styles.articleSection} ${styles.section}`}>
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