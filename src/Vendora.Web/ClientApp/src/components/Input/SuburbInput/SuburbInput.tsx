import AutoComplete from 'antd/lib/auto-complete';
import Input from 'antd/lib/input';
import * as React from 'react';

function SuburbInput(props, ref) {
  const [suburbResult, setSuburbResult] = React.useState([]);

  const suburbOptionsTemplate = suburbResult.map((sub) => (
    <AutoComplete.Option key={sub}>{sub}</AutoComplete.Option>
  ));

  const handleInputChange = (input) => {
    let result;
    if (!input) {
      result = ['Burwood', 'Chatswood', 'Ashfield', 'Hornsby'];
    } else {
      result = ['Burwood', 'Chatswood', 'Ashfield', 'Hornsby'].filter((sub) =>
        new RegExp(input, 'i').test(sub)
      );
    }
    setSuburbResult(result);
  };
  return (
    <AutoComplete
      ref={ref}
      dataSource={suburbOptionsTemplate}
      onChange={handleInputChange}
      placeholder="所在区"
    >
      <Input />
    </AutoComplete>
  );
}

export default React.forwardRef(SuburbInput);
