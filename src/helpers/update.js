// import toPairs from 'lodash/toPairs';
// import isArray from 'lodash/isArray';
// import fetch from 'isomorphic-fetch';

/**
 * api的設定, 參考 https://fetch.spec.whatwg.org/#requests
 * @type {Object}
 */
const POST_REQUEST = {
  credentials: 'same-origin',
  mode: 'same-origin',
  redirect: 'error',
  method: 'POST',
};

function toPostRequest(url, data, file, options) {
  const body = new FormData();

  Object.keys(data)
        .forEach(key => {
          const value = data[key];
          const jsonStr = typeof value === 'string' ? value : JSON.stringify(value);
          body.append(key, jsonStr);
        });

  if (file) body.append('file[]', file);

  return new Request(url, Object.assign({}, POST_REQUEST, options, { body }));
}

export default apiPath => options => {
  const { data, file, ...rest } = Object.assign({}, options);
  const request = toPostRequest(apiPath, data, file, rest);
  return fetch(request).then(res => res.json());
};
