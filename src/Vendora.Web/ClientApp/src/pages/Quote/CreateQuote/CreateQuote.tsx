import * as React from 'react';
import * as styles from './CreateQuote.module.less';
import Input from 'antd/lib/input';
import { CurrencyInput } from '@components/Input';
import { QuoteForm } from '../QuoteForm/QuoteForm';

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

  onSubmit() {

  }

  render() {
    return (
      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.stepBarContainer}>
          </div>
          <div className={styles.questionGroupContainer}>
            <QuoteForm />
            {/* <div className={styles.questionContainer}>
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
              </div> */}
          </div>
        </div>
      </div>
    );
  }
}

//export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//