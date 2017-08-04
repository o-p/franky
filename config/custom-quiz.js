export default {
  builderTitle: '問答型 SP Welcome Page 產生器',
  previewUrl: './preview/index.html',
  endpoint: '../',
  action: 'json',
  configFile: './config.json',
  pathExport: '../?action=export',
  layout: [
/*
 ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ ██████╗ ███╗   ██╗
██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔═══██╗████╗  ██║
██║     ██║   ██║██╔████╔██║██╔████╔██║██║   ██║██╔██╗ ██║
██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██║   ██║██║╚██╗██║
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
*/
    {
      component: 'settingsPanel',
      title: { zh: '共用設定', en: 'Common Settings' },
      defaultToggled: false,
      contents: [
        {
          type: 'text',
          path: ['event_name'],
          text: 'Event Name',
          hint: '用來追蹤數據用, 通常是英數',
        },
        {
          type: 'text',
          path: ['campaign_uuid'],
          text: 'Campaign UUID',
        },
        {
          type: 'text',
          path: ['playlist'],
          text: '歌單 ID',
          hint: '無歌單維持原狀即可',
        },
        {
          type: 'text',
          path: ['trackingId'],
          text: 'Tracking ID',
          hint: '格式: UA-XXXXXXXXX-X',
        },
        {
          type: 'subtitle',
          text: '元件色票',
        },
        {
          type: 'text',
          path: ['theme', 'buttonBackground'],
          text: '按鈕背景色',
        },
        {
          type: 'text',
          path: ['theme', 'buttonText'],
          text: '按鈕文字色',
        },
        {
          type: 'text',
          path: ['theme', 'contentHighlight'],
          text: '重點內文色',
        },
        {
          type: 'text',
          path: ['theme', 'contentText'],
          text: '一般內文色',
        },
        {
          type: 'text',
          path: ['theme', 'pageBackground'],
          text: '頁面背景色',
        },
        {
          type: 'text',
          path: ['theme', 'pageText'],
          text: '頁面文字色',
        },
      ],
    },
/*
██╗  ██╗ ██████╗ ███╗   ███╗███████╗
██║  ██║██╔═══██╗████╗ ████║██╔════╝
███████║██║   ██║██╔████╔██║█████╗
██╔══██║██║   ██║██║╚██╔╝██║██╔══╝
██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
*/
    {
      component: 'settingsPanel',
      title: { zh: '首頁', en: 'Home' },
      defaultToggled: false,
      contents: [
        {
          type: 'fileUploader',
          name: 'home-land.jpg',
          fileType: 'jpb',
          text: '水平 - 底圖 JPG',
          preview: true,
          hint: '靠上對齊, 下方有空間會顯示底色',
        },
        {
          type: 'fileUploader',
          name: 'home-port.jpg',
          fileType: 'jpb',
          text: '垂直 - 底圖 JPG',
          preview: true,
          hint: '靠上對齊, 下方有空間會顯示底色',
        },
        {
          type: 'fileUploader',
          name: 'home-text-land.svg',
          fileType: 'svg',
          text: '水平 - 內文 SVG',
          preview: true,
          hint: '≤ 90% 畫面寬 ／ ≤ 10 文字高',
        },
        {
          type: 'fileUploader',
          name: 'home-text-port.svg',
          fileType: 'svg',
          text: '垂直 - 內文 SVG',
          preview: true,
          hint: '跟畫面等寬, 高度自動',
        },
        {
          type: 'text',
          path: ['pages', 0, 'result', 'altContent'],
          text: '內文 SVG - 替代文字',
        },
        {
          type: 'subtitle',
          text: '按鈕 1',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 0, 'result', 'buttons', 0, 'useImage'],
          text: '使用圖檔代替文字',
          on: true,
          off: false,
        },
        {
          type: 'fileUploader',
          name: 'home-button-icon-01.svg',
          fileType: 'svg',
          text: '按鈕圖檔 SVG',
          preview: true,
          hint: '高度比按鈕略高, 寬度自動調整',
        },
        {
          type: 'text',
          path: ['pages', 0, 'result', 'buttons', 0, 'text'],
          text: '按鈕文字',
        },
        {
          type: 'subtitle',
          text: '按鈕 2',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 0, 'result', 'buttons', 1, 'type'],
          text: '顯示 / 隱藏', // 按鈕 2
          on: 'show_page',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 0, 'result', 'buttons', 1, 'value'],
          text: '問題群組 B',
          on: 'group-b',
          off: 'group-a',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 0, 'result', 'buttons', 1, 'useImage'],
          text: '使用圖檔代替文字',
          on: true,
          off: false,
        },
        {
          type: 'fileUploader',
          name: 'home-button-icon-02.svg',
          fileType: 'svg',
          text: '按鈕圖檔',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 0, 'result', 'buttons', 1, 'text'],
          text: '按鈕 2 - 文字',
        },
      ],
    },
/*
 ██████╗ ██████╗  ██████╗ ██╗   ██╗██████╗      █████╗
██╔════╝ ██╔══██╗██╔═══██╗██║   ██║██╔══██╗    ██╔══██╗
██║  ███╗██████╔╝██║   ██║██║   ██║██████╔╝    ███████║
██║   ██║██╔══██╗██║   ██║██║   ██║██╔═══╝     ██╔══██║
╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║         ██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝         ╚═╝  ╚═╝
*/
    {
      component: 'settingsPanel',
      title: { zh: '題組 A', en: 'Group A' },
      defaultToggled: false,
      contents: [
        {
          type: 'fileUploader',
          name: 'ga-land.jpg',
          fileType: 'jpg',
          text: '水平 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'ga-port.jpg',
          fileType: 'jpg',
          text: '垂直 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'subtitle',
          text: '隨機問題 1',
        },
        {
          type: 'fileUploader',
          name: 'ga01-land.svg',
          fileType: 'svg',
          text: '水平 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'ga01-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 0, 'altContent'],
          text: '替代文字',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 0, 'buttons', 0, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 0, 'buttons', 0, 'text'],
          text: '答案 1 (#A1)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 0, 'buttons', 1, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 0, 'buttons', 1, 'text'],
          text: '答案 2 (#A2)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 0, 'buttons', 2, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 0, 'buttons', 2, 'text'],
          text: '答案 3 (#A3)',
        },
        {
          type: 'subtitle',
          text: '隨機問題 2',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 1, 'randomResult', 'random', 1, 'disabled'],
          text: '開啟 / 關閉',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'ga02-land.svg',
          fileType: 'svg',
          text: '水平 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'ga02-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 1, 'altContent'],
          text: '題目替代文字',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 1, 'buttons', 0, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 1, 'buttons', 0, 'text'],
          text: '答案 1 (#A4)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 1, 'buttons', 1, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 1, 'buttons', 1, 'text'],
          text: '答案 2 (#A5)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 1, 'buttons', 2, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 1, 'buttons', 2, 'text'],
          text: '答案 3 (#A6)',
        },
        {
          type: 'subtitle',
          text: '隨機問題 3',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 1, 'randomResult', 'random', 2, 'disabled'],
          text: '開啟 / 關閉',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'ga03-land.svg',
          fileType: 'svg',
          text: '水平 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'ga03-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 2, 'altContent'],
          text: '題目替代文字',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 2, 'buttons', 0, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 2, 'buttons', 0, 'text'],
          text: '答案 1 (#A7)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 2, 'buttons', 1, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 2, 'buttons', 1, 'text'],
          text: '答案 2 (#A8)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 1, 'randomResult', 'random', 2, 'buttons', 2, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 1, 'randomResult', 'random', 2, 'buttons', 2, 'text'],
          text: '答案 3 (#A9)',
        },
      ],
    },
/*
 ██████╗ ██████╗  ██████╗ ██╗   ██╗██████╗     ██████╗
██╔════╝ ██╔══██╗██╔═══██╗██║   ██║██╔══██╗    ██╔══██╗
██║  ███╗██████╔╝██║   ██║██║   ██║██████╔╝    ██████╔╝
██║   ██║██╔══██╗██║   ██║██║   ██║██╔═══╝     ██╔══██╗
╚██████╔╝██║  ██║╚██████╔╝╚██████╔╝██║         ██████╔╝
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝         ╚═════╝
*/
    {
      component: 'settingsPanel',
      title: { zh: '題組 B', en: 'Group B' },
      defaultToggled: false,
      contents: [
        {
          type: 'fileUploader',
          name: 'complete-00-land.jpg',
          fileType: 'jpg',
          text: '水平 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-00-port.jpg',
          fileType: 'jpg',
          text: '垂直 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'subtitle',
          text: '隨機問題 1',
        },
        {
          type: 'fileUploader',
          name: 'gb01-land.svg',
          fileType: 'svg',
          text: '水平 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'gb01-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 0, 'altContent'],
          text: '替代文字',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 0, 'buttons', 0, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 0, 'buttons', 0, 'text'],
          text: '答案 1 (#B1)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 0, 'buttons', 1, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 0, 'buttons', 1, 'text'],
          text: '答案 2 (#B2)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 0, 'buttons', 2, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 0, 'buttons', 2, 'text'],
          text: '答案 3 (#B3)',
        },
        {
          type: 'subtitle',
          text: '隨機問題 2',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 2, 'randomResult', 'random', 1, 'disabled'],
          text: '開啟 / 關閉',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'gb02-land.svg',
          fileType: 'svg',
          text: '水平 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'gb02-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 1, 'altContent'],
          text: '題目替代文字',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 1, 'buttons', 0, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 1, 'buttons', 0, 'text'],
          text: '答案 1 (#B4)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 1, 'buttons', 1, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 1, 'buttons', 1, 'text'],
          text: '答案 2 (#B5)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 1, 'buttons', 2, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 1, 'buttons', 2, 'text'],
          text: '答案 3 (#B6)',
        },
        {
          type: 'subtitle',
          text: '隨機問題 3',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 2, 'randomResult', 'random', 2, 'disabled'],
          text: '開啟 / 關閉',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'gb03-land.svg',
          fileType: 'svg',
          text: '水平 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'gb03-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字圖 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 2, 'altContent'],
          text: '題目替代文字',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 2, 'buttons', 0, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 2, 'buttons', 0, 'text'],
          text: '答案 1 (#B7)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 2, 'buttons', 1, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 2, 'buttons', 1, 'text'],
          text: '答案 2 (#B8)',
        },
        {
          type: 'valueCheckbox',
          path: ['pages', 2, 'randomResult', 'random', 2, 'buttons', 2, 'type'],
          on: 'answer',
          off: 'none',
        },
        {
          type: 'text',
          path: ['pages', 2, 'randomResult', 'random', 2, 'buttons', 2, 'text'],
          text: '答案 3 (#B9)',
        },
      ],
    },
/*
██████╗  ██████╗ ███╗   ██╗███████╗
██╔══██╗██╔═══██╗████╗  ██║██╔════╝
██║  ██║██║   ██║██╔██╗ ██║█████╗
██║  ██║██║   ██║██║╚██╗██║██╔══╝
██████╔╝╚██████╔╝██║ ╚████║███████╗
╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/
    {
      component: 'settingsPanel',
      title: { zh: '任務完成頁', en: 'Task Complete' },
      defaultToggled: false,
      contents: [
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'buttons', 1, 'type'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'buttons', 1, 'type'],
          ],
          text: '歌單按鈕',
          on: 'view_playlist',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'buttons', 2, 'type'],
          text: '填寫資料',
          on: 'show_page',
          off: 'none',
        },
        {
          type: 'fileUploader',
          name: 'gb-land.jpg',
          fileType: 'jpg',
          text: '水平 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'gb-port.jpg',
          fileType: 'jpg',
          text: '垂直 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-text-land.svg',
          fileType: 'svg',
          text: '水平 - 文案 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-text-port.svg',
          fileType: 'svg',
          text: '垂直 - 文案 SVG',
          preview: true,
        },
        {
          type: 'text',
          path: ['pages', 3, 'responsiveResult', 'altContent'],
          text: '替代文字 - 文案',
          mirror: [
            ['pages', 5, 'responsiveResult', 'altContent'],
          ],
        },
        // 按鈕文字
        {
          type: 'subtitle',
          text: '按鈕文案',
        },
        {
          type: 'text',
          path: ['pages', 3, 'responsiveResult', 'buttons', 0, 'text'],
          text: '[開始聽歌]按鈕',
          mirror: [
            ['pages', 5, 'responsiveResult', 'buttons', 0, 'text'],
          ],
        },
        {
          type: 'text',
          path: ['pages', 3, 'responsiveResult', 'buttons', 1, 'text'],
          text: '[撥放歌單]按鈕',
          mirror: [
            ['pages', 5, 'responsiveResult', 'buttons', 1, 'text'],
          ],
        },
        {
          type: 'text',
          path: ['pages', 3, 'responsiveResult', 'buttons', 2, 'text'],
          text: '[提供資料]按鈕',
        },
        // 活動辦法
        {
          type: 'subtitle',
          text: '活動辦法',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'hasEventInfo'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'hasEventInfo'],
          ],
          text: '活動說明',
          on: true,
          off: false,
        },
        {
          type: 'fileUploader',
          name: 'complete-info-land.png',
          fileType: 'png',
          text: '水平 - 說明 PNG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-info-port.png',
          fileType: 'png',
          text: '垂直 - 說明 PNG',
          preview: true,
        },
        // #A1
        {
          type: 'subtitle',
          text: '答案 #A1',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '1', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '1', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-01-land.jpg',
          fileType: 'jpg',
          text: '#A1 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-01-port.jpg',
          fileType: 'jpg',
          text: '#A1 垂直 JPG',
          preview: true,
        },
        // #A2
        {
          type: 'subtitle',
          text: '答案 #A2',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '2', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '2', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-02-land.jpg',
          fileType: 'jpg',
          text: '#A2 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-02-port.jpg',
          fileType: 'jpg',
          text: '#A2 垂直 JPG',
          preview: true,
        },
        // #A3
        {
          type: 'subtitle',
          text: '答案 #A3',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '3', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '3', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-03-land.jpg',
          fileType: 'jpg',
          text: '#A3 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-03-port.jpg',
          fileType: 'jpg',
          text: '#A3 垂直 JPG',
          preview: true,
        },
        // #A4
        {
          type: 'subtitle',
          text: '答案 #A4',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '4', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '4', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-04-land.jpg',
          fileType: 'jpg',
          text: '#A4 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-04-port.jpg',
          fileType: 'jpg',
          text: '#A4 垂直 JPG',
          preview: true,
        },
        // #A5
        {
          type: 'subtitle',
          text: '答案 #A5',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '5', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '5', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-05-land.jpg',
          fileType: 'jpg',
          text: '#A5 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-05-port.jpg',
          fileType: 'jpg',
          text: '#A5 垂直 JPG',
          preview: true,
        },
        // #A6
        {
          type: 'subtitle',
          text: '答案 #A6',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '6', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '6', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-06-land.jpg',
          fileType: 'jpg',
          text: '#A6 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-06-port.jpg',
          fileType: 'jpg',
          text: '#A6 垂直 JPG',
          preview: true,
        },
        // #A7
        {
          type: 'subtitle',
          text: '答案 #A7',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '7', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '7', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-07-land.jpg',
          fileType: 'jpg',
          text: '#A7 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-07-port.jpg',
          fileType: 'jpg',
          text: '#A7 垂直 JPG',
          preview: true,
        },
        // #A8
        {
          type: 'subtitle',
          text: '答案 #A8',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '8', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '8', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-08-land.jpg',
          fileType: 'jpg',
          text: '#A8 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-08-port.jpg',
          fileType: 'jpg',
          text: '#A8 垂直 JPG',
          preview: true,
        },
        // #A9
        {
          type: 'subtitle',
          text: '答案 #A9',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '9', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '9', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-09-land.jpg',
          fileType: 'jpg',
          text: '#A9 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-09-port.jpg',
          fileType: 'jpg',
          text: '#A9 垂直 JPG',
          preview: true,
        },
        // #B1
        {
          type: 'subtitle',
          text: '答案 #B1',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '10', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '10', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-10-land.jpg',
          fileType: 'svg',
          text: '#B1 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-10-port.jpg',
          fileType: 'svg',
          text: '#B1 垂直 JPG',
          preview: true,
        },
        // #B2
        {
          type: 'subtitle',
          text: '答案 #B2',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '11', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '11', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-11-land.jpg',
          fileType: 'svg',
          text: '#B2 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-11-port.jpg',
          fileType: 'svg',
          text: '#B2 垂直 JPG',
          preview: true,
        },
        // #B3
        {
          type: 'subtitle',
          text: '答案 #B3',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '12', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '12', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-12-land.jpg',
          fileType: 'svg',
          text: '#B3 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-12-port.jpg',
          fileType: 'svg',
          text: '#B3 垂直 JPG',
          preview: true,
        },
        // #B4
        {
          type: 'subtitle',
          text: '答案 #B4',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '13', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '13', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-13-land.jpg',
          fileType: 'svg',
          text: '#B4 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-13-port.jpg',
          fileType: 'svg',
          text: '#B4 垂直 JPG',
          preview: true,
        },
        // #B5
        {
          type: 'subtitle',
          text: '答案 #B5',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '14', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '14', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-14-land.jpg',
          fileType: 'svg',
          text: '#B5 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-14-port.jpg',
          fileType: 'svg',
          text: '#B5 垂直 JPG',
          preview: true,
        },
        // #B6
        {
          type: 'subtitle',
          text: '答案 #B6',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '15', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '15', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-15-land.jpg',
          fileType: 'svg',
          text: '#B6 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-15-port.jpg',
          fileType: 'svg',
          text: '#B6 垂直 JPG',
          preview: true,
        },
        // #B7
        {
          type: 'subtitle',
          text: '答案 #B7',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '16', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '16', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-16-land.jpg',
          fileType: 'svg',
          text: '#B7 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-16-port.jpg',
          fileType: 'svg',
          text: '#B7 垂直 JPG',
          preview: true,
        },
        // #B8
        {
          type: 'subtitle',
          text: '答案 #B8',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '17', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '17', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-17-land.jpg',
          fileType: 'svg',
          text: '#B8 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-17-port.jpg',
          fileType: 'svg',
          text: '#B8 垂直 JPG',
          preview: true,
        },
        // #B9
        {
          type: 'subtitle',
          text: '答案 #B9',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 3, 'responsiveResult', 'results', '18', 'disabled'],
          mirror: [
            ['pages', 5, 'responsiveResult', 'results', '18', 'disabled'],
          ],
          text: '套用客製圖',
          on: false,
          off: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-18-land.jpg',
          fileType: 'svg',
          text: '#B9 水平 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'complete-18-port.jpg',
          fileType: 'svg',
          text: '#B9 垂直 JPG',
          preview: true,
        },
      ],
    },
/*
███████╗███████╗███████╗██████╗
██╔════╝██╔════╝██╔════╝██╔══██╗
█████╗  █████╗  █████╗  ██║  ██║
██╔══╝  ██╔══╝  ██╔══╝  ██║  ██║
██║     ███████╗███████╗██████╔╝
╚═╝     ╚══════╝╚══════╝╚═════╝
*/
    {
      component: 'settingsPanel',
      title: { zh: '填寫資料', en: 'Submit Personal Info' },
      defaultToggled: false,
      contents: [
        {
          type: 'fileUploader',
          name: 'input-land.jpg',
          fileType: 'jpg',
          text: '水平 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'input-port.jpg',
          fileType: 'jpg',
          text: '垂直 - 底圖 JPG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'input-text-land.svg',
          fileType: 'svg',
          text: '水平 - 文字 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'input-text-port.svg',
          fileType: 'svg',
          text: '垂直 - 文字 SVG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'input-info-land.png',
          fileType: 'png',
          text: '水平 - 條款 PNG',
          preview: true,
        },
        {
          type: 'fileUploader',
          name: 'input-info-port.png',
          fileType: 'png',
          text: '垂直 - 條款 PNG',
          preview: true,
        },
        {
          type: 'subtitle',
          text: '資料欄位',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 4, 'userInputs', 'fields', 0],
          text: '姓名',
          on: 'username',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 4, 'userInputs', 'fields', 1],
          text: '性別',
          on: 'gender',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 4, 'userInputs', 'fields', 2],
          text: '年齡',
          on: 'age',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 4, 'userInputs', 'fields', 3],
          text: '電話',
          on: 'tel',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 4, 'userInputs', 'fields', 4],
          text: 'Email',
          on: 'email',
          off: 'none',
        },
        {
          type: 'valueSwitcher',
          path: ['pages', 4, 'userInputs', 'fields', 5],
          text: '隱私權條款',
          on: 'policy',
          off: 'none',
        },
      ],
    },
    {
      component: 'preview',
      src: 'preview/index.html',
      className: 'land',
    },
    {
      component: 'preview',
      src: 'preview/index.html',
      className: 'port',
    },
  ],
};
