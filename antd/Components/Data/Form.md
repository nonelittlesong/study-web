
- [rc](http://react-component.github.io/badgeboard/)

![antd-redux.png](https://github.com/nonelittlesong/study-resources/blob/master/images/antd-redux.png)  

## form 属性

- `form` - 经过 `Form.create` 包装过的组件自带 `this.props.form` 属性。  
- `hideRequiredMark` - 隐藏所有表单项的必选标记。  

### getFieldDecorator()
`getFieldDecorator(name:String, option: Object) => (React.Node) => React.Node`  

**options**  
- `initialValue`  
- `triggr` - string，收集节点值的时机。  
- `valuePropName` - string，节点值的属性名。如 Switch 的是 checked。  

### validateFields(\[fieldNames: string\[]], \[options: object], callback(errors, values)) => void


## 三、 Form.Item
### props
- `extra<string|ReactNode>` - 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个。


## 例子
### 1、 自定义表单控件
- 提供受控属性 `value` 或其它与 `valuePropName` 的值同名的属性。  
- 提供 `onChange` 事件或 `trigger` 的值同名的事件。

```js
const { Form, Input, Select, Button } = antd;

const { Option } = Select;

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      console.log('shit');
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
      console.log({
        ...this.state,
        ...changedValue,
      });
    }
  };

  render() {
    const { size } = this.props;
    const { currency, number } = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Pribcbcce">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDemo = Form.create({ name: 'customized_form_controls' })(Demo);

ReactDOM.render(<WrappedDemo />, mountNode);
```
