/**
 * 依照答案呈現出不同的Result Component
 */
import { PropTypes, Component, createElement, createFactory } from 'react';
import assign from 'lodash/assign';

import Result from '../Result';

const contextTypes = {
  answers: PropTypes.object,
};
const propTypes = {
  switcher: PropTypes.string.isRequired,
  results: PropTypes.object.isRequired,
};
export default class ResponsiveResult extends Component {

  render() {
    const { switcher, results, ...props } = this.props;
    const answer = this.context.answers[switcher];
    // 多一個 disabled 選項方便透過 json 調整
    const applyCustomResult = results[answer] && !results[answer].disabled;

    if (applyCustomResult) {
      return createElement(Result, assign(props, results[answer]));
    }
    return createElement(Result, props);
  }
}
ResponsiveResult.contextTypes = contextTypes;
ResponsiveResult.propTypes = propTypes;

export const responsiveResult = createFactory(ResponsiveResult);
