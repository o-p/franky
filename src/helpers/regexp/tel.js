/**
 * passed:
 * +593 7 282-3889
 * (+44) 0848 9123 456
 * +821012345678
 * 03 345-6789 分機 123
 * (02) 520-5566 轉 9487
 * 99999-5555 ext 786544
 * +5511999995555,123
 * +886-2-345-6789 ext.999
 * --------
 * not passed:
 * 948794狂
 * A123456789
 */

// { Group1 } 國碼 - optional
const countryCode = '(\\(?\\+[0-9]{1,3}\\)?)?'; // eslint-disable-line no-useless-escape
// { Group2 } 號碼 - required (6 - 20)
const numbers = '([0-9 .\\-()]{6,20})'; // eslint-disable-line no-useless-escape
// 分機字串, 不保存
const keywordExt = '(?:ext\\.?|extension|分機|轉|,)?'; // eslint-disable-line no-useless-escape
// { Group 3 } 分機 - optional
const extension = ' ?([0-9\\-]{1,6})?'; // eslint-disable-line no-useless-escape

export default new RegExp(`^${countryCode}${numbers}${keywordExt}${extension}$`);
