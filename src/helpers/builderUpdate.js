/**
 * 這是 Builder 使用的 update api,
 * 比 update.js 新, 提供比較簡單的接口
 *
 * 輸入 endpoint => ({
 *  upload,
 *  updateJSON,
 *  updateVar,
 * })
 */

import curry from 'ramda/src/curry';

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

function updateJSON(path, json) {
  const data = {
    action: 'json',
    json,
  };
  const request = toPostRequest(path, data);
  return fetch(request);
}

function upload(path, file, filename) {
  const data = {
    action: 'update',
    type: 'file',
    filename,
  };
  const request = toPostRequest(path, data, file);
  return fetch(request);
}

function updateVar(path, key, value) {
  const data = {
    action: 'update',
    type: 'var',
    key,
    value,
  };
  const req = toPostRequest(path, data);
  return fetch(req);
}

export default apiPath => ({
  updateJSON: curry(updateJSON)(apiPath),
  upload: curry(upload)(apiPath),
  updateVar: curry(updateVar)(apiPath),
});
