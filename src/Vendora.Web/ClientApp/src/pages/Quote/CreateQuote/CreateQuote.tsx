import Carousel from 'antd/lib/carousel';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import Steps from 'antd/lib/steps';
import * as React from 'react';
import { QuoteForm } from '../QuoteForm/QuoteForm';
import { QuoteFormStepComponent } from '../QuoteFormStep/QuoteFormStep';
import * as styles from './CreateQuote.module.less';

export default class CreateQuote extends React.Component {
  public state = {
    question1: 0,
    question2: 0
  };

  public form = {
    question1: 0,
    question2: 0
  };

  public inputRef = React.createRef<Input>();

  public componentDidMount() {
    console.info(this.props);
  }

  public updateAnswer = (questionNumber) => {
    return (value) => (this.form['question' + questionNumber] = value);
  };

  public onSubmit() {}
  public render() {
    const { SubMenu, Item } = Menu;
    return (
      <div className={styles.mainSection}>
        <div className={styles.container}>
          {/* <div className={`${styles.stepBarContainer} form-step`}>
            <Menu mode="inline" className={styles.steps} defaultOpenKeys={['step1', 'step2']}>
              <SubMenu
                key="step1"
                title={<span>Service Information</span>}
                disabled={true}
                onTitleClick={({ domEvent }) => {
                  domEvent.preventDefault();
                }}
              >
                <Item key="1">Service type</Item>
                <Item key="2">Property Info</Item>
              </SubMenu>
              <SubMenu key="step2" title={<span>Loan Information</span>}>
                <Item key="5">Option 5</Item>
                <Item key="6">Option 6</Item>
              </SubMenu>
            </Menu>
          </div> */}
          <div style={{ background: '#FFF' }}>
            <div className={styles.container}>
              <div className={styles.stepBarContainer}>
                <Steps current={0} direction={'horizontal'}>
                  <Steps.Step title={'Step 1'} description={'服务信息'} />
                  <Steps.Step title={'Step 2'} description={'贷款信息'} />
                  <Steps.Step title={'Step 3'} description={'财务信息'} />
                  <Steps.Step title={'Step 4'} description={'个人信息'} />
                </Steps>
              </div>
              <div className={styles.questionGroupContainer}>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// interface QupteFormProps extends FormComponentProps {}
// class QuoteFormComponent extends React.Component<QupteFormProps> {
//   render() {
//     const {
//     } = this.props;

//     return (
//       <Form className="quote-form">
//         <Carousel>
//           <div className={styles.questionGroup}>
//             <QuoteFormStepComponent form={this.props.form} />
//           </div>
//         </Carousel>
//       </Form>
//     );
//   }
// }
// //export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//
