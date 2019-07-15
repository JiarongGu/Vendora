import { HttpClient } from '@shared/services/httpclient';
import { AutoComplete, Input, Select } from 'antd';
import * as React from 'react';

const InputGroup = Input.Group;
function SuburbInput(props, ref) {

  const httpClient = new HttpClient();
  const [suburbOptions, setsuburbOptions] = React.useState([]);

  const suburbOptionsTemplate = suburbOptions.map((sub) => (
    <AutoComplete.Option key={sub}>{sub}</AutoComplete.Option>
  ));

  const handleInputChange = (input) => {
    let result;
    if (!input) {
      result = [];
    } else {
      httpClient.get<object[]>('http://v0.postcodeapi.com.au/suburbs.json?',
      {q: input})
      .then((response) => {
        console.info(response);
        result = response.data;
      });
    }
    setsuburbOptions(result);
  };
  return (
    <InputGroup compact={true}>
      <Select defaultValue="Sign Up">
        <Select.Option value="Sign Up">Sign Up</Select.Option>
        <Select.Option value="Sign In">Sign In</Select.Option>
      </Select>

      <AutoComplete
        ref={ref}
        dataSource={suburbOptionsTemplate}
        onChange={handleInputChange}
        placeholder="所在区"
      >
      <Input />
      </AutoComplete>
    </InputGroup>
  );
}

export default React.forwardRef(SuburbInput);
