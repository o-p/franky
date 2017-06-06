import { createElement } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Save from 'material-ui/svg-icons/content/save';
import CloudDownload from 'material-ui/svg-icons/file/cloud-download';
import LowPriority from 'material-ui/svg-icons/content/low-priority';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import pathPortUi from './ui-iphone5.svg';
import pathLandUi from './ui-ipad.svg';


import { img, h1 } from '../../components/html5';

export const simulateUIPortrait = img({
  key: 'simulate-ui-port',
  src: pathPortUi,
  className: 'simulate-ui',
});

export const simulateUILandscape = img({
  key: 'simulate-ui-land',
  src: pathLandUi,
  className: 'simulate-ui',
});

export function builderTitle(text) {
  return h1({
    key: 'head-title',
    className: 'head-title',
  }, text);
}

export function exportButton(src) {
  const href = src + (
    canUseDOM ?
        `&origin=${encodeURIComponent(location.href)}` :
        ''
    );
  return createElement(FloatingActionButton, {
    className: 'floating-button floating-button--export',
    mini: true,
    download: true,
    href,
    title: '輸出 Welcome Page',
  }, createElement(CloudDownload));
}

export function updateButton(onTouchTap) {
  return createElement(FloatingActionButton, {
    onTouchTap,
    className: 'floating-button floating-button--save',
    title: '更新設定檔',
    secondary: true,
  },
    createElement(Save)
  );
}

export function midButton(onTouchTap) {
  return createElement(FloatingActionButton, {
    onTouchTap,
    className: 'floating-button floating-button--add-mid',
    title: '切換隨機題目',
    mini: true,
  }, createElement(LowPriority));
}
