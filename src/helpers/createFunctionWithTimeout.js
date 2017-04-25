/**
 * utility function copied from Google Analytics / Sending Hits section.
 *
 * @param  {Function}      callback
 * @param  {[number=1000]} timeout
 * @return {Function}
 *
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#handling_timeouts
 */
export default function createFunctionWithTimeout(callback, timeout = 1000) {
  let called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, timeout);
  return fn;
}
