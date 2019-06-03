import * as React from 'react';
import * as styles from './CreateQuote.module.less';
import Input from 'antd/lib/input';
import { CurrencyInput } from '@components/Input';
import { QuoteForm } from '../QuoteForm/QuoteForm';
import Steps from 'antd/lib/steps';

interface CreateQuoteProps {
}


export default class CreateQuote extends React.Component {

  componentDidMount() {
    console.info(this.props.children)
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
    return (
      <div className={styles.mainSection}>
        <div style={{ background: '#FFF', padding: '20px 0' }}>
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
    );
  }
}

//export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//