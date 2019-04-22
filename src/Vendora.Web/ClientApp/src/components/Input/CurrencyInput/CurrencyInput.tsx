import * as React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import * as styles from './CurrencyInput.module.less';


const formatInputCurrency = function (value) {
  value = value.replace(/[^\d,]/g, '');
  const origin = value === '' ? value : Number(value.split(',').join('')) + '';
  const list = origin.split(',');
  let num = list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

function CurrencyInput(props, ref) {
  const [value, setValue] = React.useState('');
  return (
    <Input
      ref={ref}
      className={styles.inputbox}
      value={value}
      addonBefore={<Icon type="dollar" />}
      allowClear={true}
      onChange={(e) => setValue(formatInputCurrency(e.target.value))}
    />
  );
}

export default React.forwardRef(CurrencyInput);