/**
 * @file
 *   下面是從 AST api log 爬出來一些紀錄, 供參考:
 *   ----------------------------------
 *   version:06000006,os:android
 *   version:06030090,os:iphone
 *   version:06000006,os:androidtablet
 *   version:06030090,os:touch
 *   version:06020590,os:win32
 *   version:01000002,os:webclient
 */
const SUPPORT_LIST = {
  android: 6000000,       // KKBOX v6.0 = MIH
  androidtablet: 6000000, // KKBOX v6.0 = MIH
  iphone: 0,
  ipad: 0,
  webclient: 0,
  win32: 0,
  osx: 0,
};

export default function unsupportExternalLink(params) {
  const { os, version } = params;

  // per spec, 下列兩種情況設定成不支援:
  //   1 一開始載入 - 判斷完成之前 (也就是在node環境下)
  //   2 Android < v6.0 - 目前只知道KKBOX android 6.0以下不支援, 反向表列

  // cond. 1:
  const isServerSide = typeof window === 'undefined';

  // cond. 2:
  const underSupportVersion =
    typeof SUPPORT_LIST[os] === 'number'
    && parseInt(version, 10) < SUPPORT_LIST[os];

  return isServerSide || underSupportVersion;
}
