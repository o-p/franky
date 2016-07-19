import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

let isAndroid = false;
let isDesktop = false;
let isIOS = false;
let isMobile = false;
let isWindowsPhone = false;
let isIPAD = false;

const rWindowPhone = /Windows Phone/i;
const rIOS = /(?:iPad|iPhone|iPod)/i;
const rAndroid = /Android/i;
const rIPAD = /iPad/i;

let type = 'node';
if (ExecutionEnvironment.canUseDOM) {
  const ua = navigator.userAgent;
  if (rWindowPhone.test(ua)) { // Windows Phone
    // 聽說: User agent of Windows Phone contains 'Android' and 'iPhone'
    // 所以要第一個偵測
    isMobile = isWindowsPhone = true;
    type = 'windows phone';
  } else if (rAndroid.test(ua)) { // Android
    isMobile = isAndroid = true;
    type = 'android';
  } else if (rIOS.test(ua)) { // iOS
    isIPAD = rIPAD.test(ua);
    isMobile = isIOS = true;
    type = 'ios';
  } else {
    // TODO: 區分desktop app / web client
    isDesktop = true;
    type = 'desktop';
  }
}

export default {
  isAndroid,
  isDesktop,
  isIOS,
  isMobile,
  isWindowsPhone,
  isIPAD,
  type,
};

