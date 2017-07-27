/* eslint-disable global-require, import/no-unresolved */
export default {
  event_name: '%EVENT_NAME%',
  campaign_uuid: '%CAMPAIGN_UUID%',
  playlist: '%PLAYLIST_ID%',

  ga: true,
  trackingId: 'UA-XXXXXXXXX-X',

  pages: [
    /** 首頁 */
    {
      pageName: 'home',
      types: ['result', 'goPremium'],
      result: {
        altContent: '開始測驗',
        svgTextLand: require('./img/home-text-land.svg'),
        svgTextPort: require('./img/home-text-port.svg'),
        buttons: [
          {
            text: '群組 A',
            type: 'show_page',
            value: 'group-a',
            useImage: true,
            image: require('./img/home-button-icon-01.svg'),
          },
          {
            text: '群組 B',
            type: 'show_page',
            value: 'group-b',
            useImage: true,
            image: require('./img/home-button-icon-02.svg'),
          },
        ],
      },
      goPremium: { text: '升級白金會員，無廣告' },
    },
    /** 問題群組 A */
    {
      pageName: 'group-a',
      types: ['randomResult'],
      randomResult: {
        imagePortrait: require('./img/ga-port.jpg'),
        random: [
          /** 隨機題目 1 */
          {
            altContent: '',
            svgTextLand: require('./img/ga01-land.svg'),
            svgTextPort: require('./img/ga01-port.svg'),
            disabled: false,
            buttons: [
              {
                type: 'answer',
                text: '男的',
                page: 'complete',
                question: 'quiz',
                answer: 1,
              },
              {
                type: 'answer',
                text: '女的',
                page: 'complete',
                question: 'quiz',
                answer: 2,
              },
              {
                type: 'answer',
                text: '不知道',
                page: 'complete',
                question: 'quiz',
                answer: 3,
              },
            ],
          },
          /** 隨機題目 2 */
          {
            altContent: '',
            svgTextLand: require('./img/ga02-land.svg'),
            svgTextPort: require('./img/ga02-port.svg'),
            disabled: false,
            buttons: [
              {
                type: 'answer',
                text: '已無感',
                page: 'complete',
                question: 'quiz',
                answer: 4,
              },
              {
                type: 'answer',
                text: 'ㄎㄎ',
                page: 'complete',
                question: 'quiz',
                answer: 5,
              },
              {
                type: 'answer',
                text: '你說呢',
                page: 'complete',
                question: 'quiz',
                answer: 6,
              },
            ],
          },
          /** 隨機題目 3 */
          {
            altContent: '',
            svgTextLand: require('./img/ga03-land.svg'),
            svgTextPort: require('./img/ga03-port.svg'),
            disabled: false,
            buttons: [
              {
                type: 'answer',
                text: '都可以',
                page: 'complete',
                question: 'quiz',
                answer: 7,
              },
              {
                type: 'answer',
                text: '隨便',
                page: 'complete',
                question: 'quiz',
                answer: 8,
              },
              {
                type: 'answer',
                text: '吃剩的',
                page: 'complete',
                question: 'quiz',
                answer: 9,
              },
            ],
          },
        ],
      },
    },
    /** 問題群組 B */
    {
      pageName: 'group-b',
      types: ['randomResult'],
      randomResult: {
        imagePortrait: require('./img/gb-port.jpg'),
        random: [
          /** 隨機題目 1 */
          {
            altContent: '',
            svgTextLand: require('./img/gb01-land.svg'),
            svgTextPort: require('./img/gb01-port.svg'),
            disabled: false,
            buttons: [
              {
                type: 'answer',
                text: '夜夜夜夜',
                page: 'complete',
                question: 'quiz',
                answer: 10,
              },
              {
                type: 'answer',
                text: '大約在冬季',
                page: 'complete',
                question: 'quiz',
                answer: 11,
              },
              {
                type: 'answer',
                text: '如果還有明天',
                page: 'complete',
                question: 'quiz',
                answer: 12,
              },
            ],
          },
          /** 隨機題目 2 */
          {
            altContent: '',
            svgTextLand: require('./img/gb02-land.svg'),
            svgTextPort: require('./img/gb02-port.svg'),
            disabled: false,
            buttons: [
              {
                type: 'answer',
                text: 'If You Can Dream',
                page: 'complete',
                question: 'quiz',
                answer: 13,
              },
              {
                type: 'answer',
                text: 'Under the Sea',
                page: 'complete',
                question: 'quiz',
                answer: 14,
              },
              {
                type: 'answer',
                text: 'Let It Go',
                page: 'complete',
                question: 'quiz',
                answer: 15,
              },
            ],
          },
          /** 隨機題目 3 */
          {
            altContent: '',
            svgTextLand: require('./img/gb03-land.svg'),
            svgTextPort: require('./img/gb03-port.svg'),
            disabled: false,
            buttons: [
              {
                type: 'answer',
                text: '有些事現在不做 一輩子都不會做了',
                page: 'complete',
                question: 'quiz',
                answer: 16,
              },
              {
                type: 'answer',
                text: '你不是真正的快樂',
                page: 'complete',
                question: 'quiz',
                answer: 17,
              },
              {
                type: 'answer',
                text: '如果我們不曾相遇',
                page: 'complete',
                question: 'quiz',
                answer: 18,
              },
            ],
          },
        ],
      },
    },
    /** 完成任務 */
    {
      pageName: 'complete',
      types: ['responsiveResult', 'imageModal'],
      responsiveResult: {
        switcher: 'quiz',
        // 這邊如果不加上 show-custom-bg, 會使用共用的 img complete-00-{ori}.port
        results: {
          1: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-01-port.jpg'),
          },
          2: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-02-port.jpg'),
          },
          3: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-03-port.jpg'),
          },
          4: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-04-port.jpg'),
          },
          5: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-05-port.jpg'),
          },
          6: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-06-port.jpg'),
          },
          7: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-07-port.jpg'),
          },
          8: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-08-port.jpg'),
          },
          9: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-09-port.jpg'),
          },
          10: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-10-port.jpg'),
          },
          11: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-11-port.jpg'),
          },
          12: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-12-port.jpg'),
          },
          13: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-13-port.jpg'),
          },
          14: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-14-port.jpg'),
          },
          15: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-15-port.jpg'),
          },
          16: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-16-port.jpg'),
          },
          17: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-17-port.jpg'),
          },
          18: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-18-port.jpg'),
          },
        },
        altContent: '完成任務 - 留下資料',
        hasEventInfo: true,
        imagePortrait: require('./img/complete-00-port.jpg'),
        svgTextLand: require('./img/complete-text-land.svg'),
        svgTextPort: require('./img/complete-text-port.svg'),
        buttons: [
          { type: 'playit', text: '開始聽歌' },
          { type: 'view_playlist', text: '撥放歌單' },
          { type: 'show_page', text: '提供資料', value: 'feed' },
        ],
      },
      imageModal: {
        land: require('./img/complete-info-land.png'),
        port: require('./img/complete-info-port.png'),
      },
    },
    /** 使用者提供資料 */
    {
      pageName: 'feed',
      types: ['userInputs', 'imageModal'],
      userInputs: {
        buttons: [
          {
            text: '返回',
            type: 'cancel',
          },
          {
            text: '送出',
            type: 'submit',
          },
        ],
        fields: ['username', 'gender', 'age', 'tel', 'email', 'policy'],
        imagePortrait: require('./img/input-port.jpg'),
        svgTextLand: require('./img/input-text-land.svg'),
        svgTextPort: require('./img/input-text-port.svg'),
      },
      imageModal: {
        land: require('./img/input-info-land.png'),
        port: require('./img/input-info-port.png'),
      },
    },
    /** 完成任務並送出資料 */
    {
      pageName: 'complete data-sent',
      types: ['responsiveResult', 'imageModal'],
      responsiveResult: {
        switcher: 'quiz',
        results: {
          1: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-01-port.jpg'),
          },
          2: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-02-port.jpg'),
          },
          3: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-03-port.jpg'),
          },
          4: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-04-port.jpg'),
          },
          5: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-05-port.jpg'),
          },
          6: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-06-port.jpg'),
          },
          7: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-07-port.jpg'),
          },
          8: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-08-port.jpg'),
          },
          9: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-09-port.jpg'),
          },
          10: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-10-port.jpg'),
          },
          11: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-11-port.jpg'),
          },
          12: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-12-port.jpg'),
          },
          13: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-13-port.jpg'),
          },
          14: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-14-port.jpg'),
          },
          15: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-15-port.jpg'),
          },
          16: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-16-port.jpg'),
          },
          17: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-17-port.jpg'),
          },
          18: {
            className: 'show-custom-bg',
            disabled: false,
            imagePortrait: require('./img/complete-18-port.jpg'),
          },
        },
        altContent: '完成任務 - 開始聽歌',
        hasEventInfo: true,
        imagePortrait: require('./img/complete-00-port.jpg'),
        svgTextLand: require('./img/complete-text-land.svg'),
        svgTextPort: require('./img/complete-text-port.svg'),
        buttons: [
          { type: 'playit', text: '開始聽歌' },
          { type: 'view_playlist', text: '撥放歌單' },
        ],
      },
      imageModal: {
        land: require('./img/complete-info-land.png'),
        port: require('./img/complete-info-port.png'),
      },
    },
  ],
  theme: {
    // 頁面:
    pageBackground: 'transparent', // '#BE1E88'
    pageText: '#000',

    // 元件:
    contentText: '#000',
    contentHighlight: '#FFF',

    // 按鈕:
    buttonBackground: 'rgba(133, 2, 46, 0.9)',
    buttonText: '#FFF',
  },
};
/* eslint-enable global-require, import/no-unresolved */
