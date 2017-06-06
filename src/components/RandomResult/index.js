/**
 * 透過 mid & 日期 產出一組固定的隨機值, 用來避免同一個 user 在旋轉裝置時題目改變
 * 為了方便產生器調整, random 中有一個 disabled 參數來篩選亂數問題組.
 */
import { createElement, createFactory, PropTypes, Component } from 'react';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import merge from 'ramda/src/merge';
import loc from '../../helpers/location';
import Result from '../Result';

export default class RandomResult extends Component {
  componentWillMount() {
    let { mid } = loc; // 依照 msno 產出的 random seed

    if (!mid) {
      mid = ExecutionEnvironment.canUseDOM
          ? location.href // 開發中的瀏覽器, 用完整網址當作參數, 方便測試
          : '0'; // bundle 階段的預設值
    }

    // 同一 msno 始終得到相同數字:
    const seed = [...mid].reduce((sum, char) => (sum + char.charCodeAt()) % 101, 0);
    const shift = new Date().getDate();

    const { random, ...other } = this.props;

    const filtered = random.filter(res => !res.disabled);

    this.todayResult = merge(other, filtered[(seed + shift) % filtered.length]);
  }

  render() {
    return createElement(Result, this.todayResult);
  }
}

RandomResult.propTypes = {
  random: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const randomResult = createFactory(RandomResult);
