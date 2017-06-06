import React, { PropTypes, Component } from 'react';

const propTypes = {
  show: PropTypes.bool,
  fillColor: PropTypes.string,
  size: PropTypes.number,
};
export default class SvgCheckIcon extends Component {
  componentWillMount() {
    const { size, fillColor } = this.props;

    this.icon = (
      <svg
        className="svg-check-icon"
        width={size} height={size}
        viewBox="0 3 30 35"
        fill={fillColor}
      >
        <polygon points="29.4,7.1 25.6,3.3 9.6,19.3 4.4,14 0.6,17.8 9.5,26.7 9.6,26.5 9.8,26.7" />
      </svg>
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }

  render() {
    const { show } = this.props;
    return show ? this.icon : null;
  }
}
SvgCheckIcon.propTypes = propTypes;
