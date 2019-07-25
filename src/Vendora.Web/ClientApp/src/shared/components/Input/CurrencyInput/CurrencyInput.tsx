import { Icon, Input } from 'antd';
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './CurrencyInput.module.less';

interface CurrencyInputProps {
  onChange: (input: number) => void;
  defaultValue?: number;
  className?: string;
}

const formatInputCurrency = (value: number | undefined) => {
  if (!value) return '$0';

  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0
  }).format(value);
};

const formatOutputValue = (display: string) => {
  return Number(display.replace(/[\$,]/g, '')) || 0;
};

const CurrencyInput: React.RefForwardingComponent<Input, CurrencyInputProps> = (props, ref) => {
  const defaultValue = formatInputCurrency(props.defaultValue);
  const [display, setDisplay] = React.useState(defaultValue);

  const onchange = (input: string) => {
    const value = formatOutputValue(input);
    setDisplay(formatInputCurrency(value));
    props.onChange(value);
  };

  return (
    <Input
      ref={ref}
      className={classNames(props.className, styles.container)}
      value={display}
      addonBefore={<Icon type={'dollar'} />}
      allowClear={true}
      onChange={(e) => onchange(e.target.value)}
    />
  );
};

export default React.forwardRef(CurrencyInput);
