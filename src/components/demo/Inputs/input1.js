import React from "react";
import { Input, Tooltip } from "antd";
import { Select, Icon } from "antd";

const Search = Input.Search;
const Option = Select.Option;
const InputGroup = Input.Group;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 90 }}>
    <Option value="Http://">Http://</Option>
    <Option value="Https://">Https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" style={{ width: 80 }}>
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);

function formatNumber(value) {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
}

class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      onChange({ value: value.slice(0, -1) });
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== "-" ? formatNumber(value) : "-"}
      </span>
    ) : (
      "Input a number"
    );
    return (
      <Tooltip
        trigger={["focus"]}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="Input a number"
          maxLength="25"
        />
      </Tooltip>
    );
  }
}

class NumericInputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <NumericInput
          style={{ width: 120 }}
          value={this.state.value}
          onChange={this.onChange}
        />
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <br />
        <br />
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          enterButton
        />
        <br />
        <br />
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />

        <div>
          <div style={{ marginBottom: 16 }}>
            <Input
              addonBefore="Http://"
              addonAfter=".com"
              defaultValue="mysite"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input
              addonBefore={selectBefore}
              addonAfter={selectAfter}
              defaultValue="mysite"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" />
          </div>


                  <InputGroup compact>
          <Input style={{ width: '20%' }} defaultValue="0571" />
          <Input style={{ width: '30%' }} defaultValue="26888888" />
        </InputGroup>
        </div>
      </div>
    );
  }
}

export default NumericInputDemo;
