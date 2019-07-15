import { Icon, Input } from 'antd';
import * as React from 'react';
import * as styles from './CurrencyInput.module.less';

const formatInputCurrency = (value) => {
  value = value.replace(/[^\d]/g, '');
  const origin = value === '' ? value : Number(value.split(',').join('')) + '';
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0
  }).format(Number(origin));
};

const formatOutputValue = (display) => {
  return Number(display.replace(/[\$,]/g, '')) || 0;
};

function CurrencyInput(props, ref) {
  const [display, setDisplay] = React.useState('');
  const onchange = (input: string) => {
    const newDisplay = formatInputCurrency(input);
    setDisplay(newDisplay);
    props.onChange(formatOutputValue(newDisplay));
  };
  return (
    <Input
      ref={ref}
      className={styles.container}
      value={display}
      addonBefore={<Icon type={'dollar'} />}
      allowClear={true}
      onChange={(e) => onchange(e.target.value)}
    />
  );
}

export default React.forwardRef(CurrencyInput);