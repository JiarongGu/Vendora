import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import * as styles from './CreateQuote.module.less';
import Icon from 'antd/lib/icon';
import { ContentService } from '@services/common/ContentService';
import { MainLayoutService } from '@services/laytous/MainLayoutService';
import Input from 'antd/lib/input';
import { CurrencyInput } from '@components/Input';

interface CreateQuoteProps {
}


export default class CreateQuote extends React.Component {
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
  render() {
    return (
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className='row'>
            <div className={styles.stepBarContainer}>
            </div>

            <div className={styles.questionGroupContainer}>
              <div className={styles.questionContainer}>
                <div className={styles.question}>
                  <h2>What is the expected purchase price? </h2>
                </div>
                <div className={styles.answerGroup}>
                  <CurrencyInput ref={this.inputRef} onChange={this.updateAnswer(1)} />
                  <div>{this.form.question1}</div>
                </div>
              </div>
              <div className={styles.questionContainer}>
                <div className={styles.question}>
                  <h2>How much deposit do you have?</h2>
                </div>
                <div className={styles.answerGroup}>
                  <CurrencyInput ref={this.inputRef} onChange={this.updateAnswer(2)} />
                  <div>{this.form.question2}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//