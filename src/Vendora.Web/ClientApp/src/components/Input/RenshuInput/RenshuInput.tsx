import { Icon, Input, Button } from 'antd';
import * as React from 'react';
import * as styles from './RenshuInput.module.less';

const formatInputNumber = (value) => {
  value = value.replace(/[^\d]/g, '');
  if (Number(value) > 10) {
    return 10 + '';
  }
  const origin = value === '' ? value : Number(value) + '';
  return origin;
};

function RenshuInput(props, ref) {
  const [display, setDisplay] = React.useState('1');
  const onchange = (input: string) => {
    const newDisplay = formatInputNumber(input);
    setDisplay(newDisplay);
    // props.onChange(Number(display) || 0);
  };
  const adjust = (adjustvalue: number) => {
    let currentValue = Number(display);
    if (currentValue + adjustvalue <= 10 && currentValue + adjustvalue > 0) {
      currentValue += adjustvalue;
    }
    setDisplay(Number(currentValue) + '');
  };

  return (
    <>
      <Button className={styles.adjustButton} onClick={() => adjust(-1)} ><Icon type="minus-square" /></Button>
      <Input
        ref={ref}
        className={styles.numberInputbox}
        value={display}
        onChange={(e) => onchange(e.target.value)}
      />
      <Button className={styles.adjustButton} onClick={() => adjust(1)} ><Icon type="plus-square" /></Button>
    </>
  );
}

export default React.forwardRef(RenshuInput);
