// import toPairs from 'lodash/toPairs';
// import isArray from 'lodash/isArray';
// import fetch from 'isomorphic-fetch';
// import { post, upload } from 'unjq-ajax';

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
  return fetch(request);
};

// export default apiPath => options => {
//   const { data, file } = Object.assign({}, options);

//   const serializedData = Object.keys(data)
//                                .map(key => `${key}=${data[key]}`)
//                                .join('&');

//   if (file) {
//     return new Promise(res => upload(file, apiPath, serializedData, res));
//   }
//   return new Promise(res => post(apiPath, serializedData, res));
//   // return ajax.post(apiPath, {
//   //   data: dataAll,
//   // }, )
//   // const request = toPostRequest(apiPath, data, file, rest);
//   // return fetch(request).then(res => res.json());
// };

