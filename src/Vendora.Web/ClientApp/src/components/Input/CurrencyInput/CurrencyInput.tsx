import * as React from 'react';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import * as styles from './CurrencyInput.module.less';


const formatInputCurrency = function (value) {
    // value += '';
    value = value.replace(/[^\d,]/g, '');
    const origin = value === '' ? value : Number(value.split(',').join(''))+'';
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
interface CurrencyInputProps{
    onChange?: any;
}
interface InputState{
    value;
}
export default class CurrencyInput extends React.Component<CurrencyInputProps> {
    state: InputState = {
        value: ''
    }
    onChange = (e) => {
        const { value } = e.target;
        const formatted = formatInputCurrency(value), numeric = Number(formatted.replace(/,/g, '')) || 0;
        this.setState({value: formatted});
        this.props.onChange(numeric);
    }
    render() {
        return (
            <>
                <Input className={styles.inputbox} value={this.state.value} addonBefore={<Icon type="dollar" />} allowClear={true} onChange={this.onChange}/>
            </>
        );
    }
}