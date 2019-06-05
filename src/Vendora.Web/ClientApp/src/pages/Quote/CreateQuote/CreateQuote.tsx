import * as React from 'react';
import * as styles from './CreateQuote.module.less';
import Input from 'antd/lib/input';
import { CurrencyInput } from '@components/Input';
import Menu from 'antd/lib/menu'
import Carousel from 'antd/lib/carousel';
import { QuoteFormStepComponent } from '../QuoteFormStep/QuoteFormStep';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import Radio from 'antd/lib/radio';

interface CreateQuoteProps {

}


export default class CreateQuote extends React.Component<CreateQuoteProps> {

  componentDidMount() {
    console.info(this.props)
  }
  state = {
    question1: 0,
    question2: 0,
  }

  form = {
    question1: 0,
    question2: 0
  }

  inputRef = React.createRef<Input>();

  updateAnswer = (questionNumber) => {
    return (value) => this.form['question' + questionNumber] = value;
  };

  onSubmit() {

  }
  render() {
    const { SubMenu, ItemGroup, Item } = Menu;
    return (
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className={`${styles.stepBarContainer} form-step`}>
          <Menu mode="inline" className={styles.steps} defaultOpenKeys= {['step1', 'step2']}>
            <SubMenu
              key="step1"
              title={
                <span>Service Information</span>
              }
              disabled = {true}
              onTitleClick = {({key, domEvent}) => { domEvent.preventDefault(); }}
            >
              <Item key="1">Service type</Item>
              <Item key="2">Property Info</Item>
            </SubMenu>
            <SubMenu key="step2"
              title={
                <span>Loan Information</span>
              }
            >
              <Item key="5">Option 5</Item>
              <Item key="6">Option 6</Item>
            </SubMenu>
          </Menu>
          </div>
          <div className={styles.questionGroupContainer}>
              <QuoteForm />
          </div>
        </div>
      </div>
    );
  }
}

interface QupteFormProps extends FormComponentProps {

}
class QuoteFormComponent extends React.Component<QupteFormProps> {
  
  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      
      <Form className="quote-form">
        <Carousel>
            <div className={styles.questionGroup}>
              <QuoteFormStepComponent form={this.props.form}/>
            </div>

          </Carousel>
      </Form>
    )
  }
}
const QuoteForm = Form.create({ name: 'quote' })(QuoteFormComponent);
//export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//