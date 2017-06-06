/**
 * 將使用者行為以及問卷答案回傳 AST server
 */
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
if (ExecutionEnvironment.canUseDOM && typeof Promise !== 'function') {
  // 避免這段polyfill在bundle時被載入
  require('es6-promise').polyfill(); // eslint-disable-line global-require
}
import 'whatwg-fetch';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

const host = 'https://event.sp.kkbox.com.tw';
// const host = 'https://demo.ad.kkbox.com.tw'; // debug server
const endpoint = '/events/';
const dataLayer = [];
let cursor = 0;

export function log(data) {
  if (typeof data === 'string') {
    return dataLayer.push({ [data]: true });
  }
  return dataLayer.push(data);
}
function extractData(options = {}) {
  const dataSent = dataLayer.slice(cursor);
  if (options.clean) {
    cursor += dataSent.length;
  }
  return merge({}, ...dataSent);
}
function generatePostBody(data) {
  return reduce(data, (form, val, key) => {
    form.append(key, val);
    return form;
  }, new FormData());
}
const DEFAULT_POST_REQUEST = {
  credentials: 'omit',
  mode: 'no-cors',
  redirect: 'error',
  method: 'POST',
  timeout: 5000,
};
const TYPES = {
  playit: '0', // 自行選歌
  playlist: '1', // 有歌單
  go_premium: '2', // 升級白金會員
};
export function send(option, callback) { // option.answer = [...key]
  const {
    answers,
    campaign_uuid,
    duration,
    event_info,
    event_name,
    level = 0,
    playlist = '0',
    type,
    uid,
  } = option;

  const loggedData = extractData(); // { clean: true });
  const answer = answers.map(key => {
    const value = loggedData[key];
    delete loggedData[key];
    return value;
  });
  const data = JSON.stringify(merge(loggedData, {
    duration,
    answer: answer.join(','),
    trace: {
      type: TYPES[type],
      playlist_id: playlist,
      missionid: campaign_uuid,
      event_info,
      playlist,
      level,
    },
  }));
  return fetch(host + endpoint, merge({}, DEFAULT_POST_REQUEST, {
    body: generatePostBody({
      event_name,
      uid,
      data,
    }),
  }))
  .then(callback)
  .catch(callback);
}
