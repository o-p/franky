/**
 * 處理使用者輸入資料的部分
 */
import './user-inputs.scss';
import { PropTypes, Component, createFactory } from 'react';
import assign from 'lodash/assign';
import { landImage, portImage } from '../ImageWithMediaQuery';
import fieldComponents from './fieldComponents';
import { div, button } from '../html5';

const contextTypes = {
  styles: PropTypes.object,
  toStep: PropTypes.func,
  toggleLightbox: PropTypes.func,
  userFeed: PropTypes.func,
};
const propTypes = {
  altContent: PropTypes.string,
  buttons: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  imageLandscape: PropTypes.string,
  imagePortrait: PropTypes.string,
  svgTextLand: PropTypes.string,
  svgTextPort: PropTypes.string,
};
export default class UserInputs extends Component {

  constructor(props) {
    super(props);

    this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
    this.onCancel = () => this.context.toStep(-1);
    this.onSubmit = this.onSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    this.landImage = landImage({
      src: props.imageLandscape,
      className: 'user-inputs-image land',
    });

    this.portImage = portImage({
      src: props.imagePortrait,
      className: 'user-inputs-image port',
    });

    this.portContent = portImage({
      src: props.svgTextPort,
      alt: props.altContent,
      className: 'user-inputs-text port',
    });

    this.landContent = landImage({
      src: props.svgTextLand,
      alt: props.altContent,
      className: 'user-inputs-text land',
    });

    this.state = {
      values: {},
      valids: {},
    };

    this.buttonPresets = {
      cancel: {
        onClick: this.onCancel,
      },
      submit: {
        onClick: this.onSubmit,
        isDisabled: this.isSubmitDisabled,
      },
    };

    this.setAnchor = (dom) => { this.bottom = dom; };
    // 方便 JSON 調整顯示欄位, 增加 type: none
    this.fields = props.fields.filter(type => type && type !== 'none');
    this.handlers = this.fields.map(name => ({
      onValidStateChange: this.onChange.bind(this, 'valids', name),
      onValueChange: this.onChange.bind(this, 'values', name),
    }));
  }

  componentDidMount() {
    window.setTimeout(this.scrollToBottom, 500);
  }

  onChange(type, field, value) {
    const origin = this.state[type];
    this.setState({
      [type]: assign({}, origin, {
        [field]: typeof value instanceof Function ? value() : value,
      }),
    });
  }

  onSubmit() {
    const { values } = this.state;
    const { userFeed, toStep } = this.context;
    userFeed(values);
    return toStep(1);
  }

  scrollToBottom() {
    return this.bottom instanceof HTMLElement
        && this.bottom.scrollIntoView({ smooth: true });
  }

  get isAllFieldsValid() {
    return this.fields.every(name => this.state.valids[name]);
  }

  /* 是否可送出表單 */
  isSubmitDisabled() {
    return !this.isAllFieldsValid;
  }

  // | 姓名 | _____________________ |
  // | 電話 | _____________________ |
  get inputFields() {
    const rows = this.fields.map((name, key) => {
      const component = fieldComponents[name];

      return component && component(assign({ key }, this.handlers[key]));
    });

    return div({
      key: 'fields',
      className: 'user-inputs-fields-wrapper',
    }, rows);
  }

  // [返回] [送出]
  get buttons() {
    const { styles } = this.context;
    const buttons = this.props.buttons.map(setting => {
      const { text, type } = setting;

      const { isDisabled, onClick } = this.buttonPresets[type];
      return button({
        key: type,
        className: 'user-inputs-button',
        style: styles.button,
        onClick,
        disabled: typeof isDisabled === 'function' && isDisabled(),
      }, text);
    });
    return div({
      key: 'buttons',
      className: 'user-inputs-buttons-wrapper',
    }, buttons);
  }

  get contents() {
    const anchor = div({
      ref: this.setAnchor,
      className: 'user-inputs-bottom-anchor',
    }, ' ');
    return div({
      key: 'user-inputs-contents',
      className: 'user-inputs-contents',
    },
      this.portContent,
      this.landContent,
      this.inputFields,
      this.buttons,
      anchor,
    );
  }

  render() {
    return div({
      className: 'user-inputs',
    },
      this.portImage,
      this.landImage,
      this.contents,
    );
  }
}
UserInputs.contextTypes = contextTypes;
UserInputs.propTypes = propTypes;

export const userInputs = createFactory(UserInputs);
