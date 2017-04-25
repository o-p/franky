import { PropTypes, Component } from 'react';

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.path = props.path;
    this.mirrorPaths = props.mirror
        ? [props.path, ...props.mirror]
        : [props.path];
  }

  componentWillMount() {
    this.defaultValue = this.value;
  }

  get value() {
    return this.context.getJSON(this.path);
  }

  set value(value) {
    if (this.props.mirror) {
      return this.context.setMultipleJSON(this.mirrorPaths, value);
    }
    return this.context.setJSON(this.path, value);
  }
}

Base.propTypes = {
  path: PropTypes.array,
  mirror: PropTypes.array, // 如果調整數值, 鏡像到其他 path (只有 set 會影響)
};
Base.contextTypes = {
  getJSON: PropTypes.func,
  setJSON: PropTypes.func,
  setMultipleJSON: PropTypes.func,
};
