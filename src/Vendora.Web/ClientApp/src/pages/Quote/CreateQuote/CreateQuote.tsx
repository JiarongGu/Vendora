import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import * as styles from './CreateQuote.module.less';
import Icon from 'antd/lib/icon';
import { ContentService } from '@services/common/ContentService';
import { MainLayoutService } from '@services/laytous/MainLayoutService';
import Steps from 'antd/lib/steps';
import Input from 'antd/lib/input';
import { CurrencyInput } from '@components/Input';

interface CreateQuoteProps {
}


export default class CreateQuote extends React.Component {
  state = {
    answer: 0
  }  
  
  inputRef = React.createRef<Input>();
  
  getInputNumber = () => { 
    const currency = this.inputRef.current ? this.inputRef.current.state.value : '0';
    return Number(currency.replace(/,/g, '')) || 0;
  };

  render() {
    return (
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className='row'>
            <div className={styles.stepBarContainer}>
              <Steps className={styles.stepBar} direction="vertical" current={1}>
                <Steps.Step title="Finished" description="This is a description." />
                <Steps.Step title="In Progress" description="This is a description." />
                <Steps.Step title="Waiting" description="This is a description." />
              </Steps>
            </div>

            <div className={styles.questionGroupContainer}>
              <div className={styles.questionContainer}>
                <div className={styles.question}>
                  <h2>What is the expected purchase price? </h2>
                </div>
                <div className={styles.answerGroup}>
                  <CurrencyInput ref={this.inputRef} />
                  <div>{this.state.answer}</div>
                </div>
                <Button onClick={() => this.setState({ answer: this.getInputNumber() })}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//