
- [React组件性能优化](https://segmentfault.com/a/1190000006100489) by segmentfault

```jsx
var PureRenderMixin = require('react-addons-pure-render-mixin');
React.createClass({
      mixins: [PureRenderMixin],

      render: function() {
        return <div className={this.props.className}>foo</div>;
      }
});
```

ES6:  
```jsx
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
      constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
      }

      render() {
        return <div className={this.props.className}>foo</div>;
      }
}
```
