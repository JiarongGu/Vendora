import * as React from 'react';
import { sinking } from 'redux-sink';
import Button from 'antd/lib/button';
import * as styles from './CreateQuote.module.less';
import Icon from 'antd/lib/icon';
import { ContentService } from '@services/common/ContentService';
import { MainLayoutService } from '@services/laytous/MainLayoutService';
import { Link } from '@components/Link';
import Steps from 'antd/lib/steps';
import Input from 'antd/lib/input';

interface CreateQuoteProps {
}

export function CreateQuote({ }: CreateQuoteProps) {
  //React.useEffect(() => mainLayoutService.displayFooter(false));
  const formatInputCurrency = function(e) {
    let { value } = e.target;
      console.info(value, typeof value);
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '') {
        value += '';
        const list = value.split('.');
        let num = list[0];
        let result = '';
        while (num.length > 3) {
            result = `,${num.slice(-3)}${result}`;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }
        return `${result}${list[1] ? `.${list[1]}` : ''}`;
    }
    return '';
  }
  return (
    <>
        <div className={styles.mainSection}>
            <div className={styles.container}>
                <div className='row'>
                    <div className={styles.stepBarContainer}>
                        <Steps className={styles.stepBar} direction="vertical" current={1}>
                            <Steps.Step title="Finished" description="This is a description." />
                            <Steps.Step  title="In Progress" description="This is a description." />
                            <Steps.Step  title="Waiting" description="This is a description." />
                        </Steps>
                    </div>
                    
                    <div className={styles.questionGroupContainer}>
                        <div className={styles.questionContainer}>
                            <div className={styles.question}>
                                <h2>What is the expected purchase price? </h2>
                            </div>
                            <div className={styles.answerGroup}>
                                <Input addonBefore={<Icon type="dollar" />}  allowClear={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

//export default sinking(ContentService, MainLayoutService)(Home) as React.FunctionComponent;//