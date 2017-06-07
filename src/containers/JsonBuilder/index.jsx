import './style.scss';

import { createElement, Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import emptyFunction from 'fbjs/lib/emptyFunction';

import compose from 'ramda/src/compose';
import merge from 'ramda/src/merge';
import pick from 'ramda/src/pick';

import { builderTitle, exportButton, updateButton, midButton } from './staticElements';
import { div } from '../../components/html5';
import StandardPage from '../../components/StandardPage';
import * as builderComponents from '../../components/BuilderComponents';
import ConfigHandler from './ConfigHandler';
import update from '../../helpers/builderUpdate';

injectTapEventPlugin();

export default class JsonBuilder extends Component {

  constructor(props) {
    super(props);

    this.builderTitle = builderTitle(props.builderTitle);
    this.configHandler = {
      get: emptyFunction,
      update: emptyFunction,
    };

    // 這邊要注意不能直接指派, 因為 handler 會一直換
    this.getJSON = this.getJSON.bind(this);
    this.setJSON = this.setJSON.bind(this);
    this.setMultipleJSON = this.setMultipleJSON.bind(this);
    this.setDefaultJson = this.setDefaultJson.bind(this);
    this.increaseMid = () => this.setState({ mid: this.state.mid + 1 });
    this.logApiUpdate = () => this.setState({
      apiUpdate: Date.now(),
    });

    this.logApiError = lastApiError => this.setState({
      apiError: Date.now(),
      lastApiError,
    });

    this.api = update(props.endpoint);
    this.updateFile = (file, filename) => this.api.upload(file, filename)
        // 此 API 沒有 response
        .then(this.logApiUpdate)
        .catch(this.onApiError);
    this.updateJSON = () => this.api.updateJSON(this.configHandler.toJSON())
        // 此 API 沒有 response
        .then(this.logApiUpdate)
        .catch(this.onApiError);

    this.state = {
      apiError: 0,
      apiUpdate: 0,
      init: false,
      lastApiError: null,
      timeStamp: Date.now(),
      mid: 0, // 假的 mid, 方便 debug 切換答案使用
    };
    this.midButton = midButton(this.increaseMid);
    this.exportButton = exportButton(props.pathExport);
    this.updateButton = updateButton(this.updateJSON);
  }

  getChildContext() {
    const { apiError, apiUpdate, lastApiError, mid } = this.state;
    return {
      apiError,
      apiUpdate,
      getJSON: this.getJSON,
      lastApiError,
      mid,
      setJSON: this.setJSON,
      setMultipleJSON: this.setMultipleJSON,
      updateFile: this.updateFile,
    };
  }

  componentDidMount() {
    const { configFile } = this.props;
    fetch(configFile)
        .then(res => res.json())
        .then(this.setDefaultJson);
  }

  /**
   * 讀取完預設 JSON handler
   * @param {object} json
   */
  setDefaultJson(json) {
    const mergeIntoConfig = compose(merge, pick(['action', 'endpoint']))(this.props);
    this.configHandler = compose(ConfigHandler.of, mergeIntoConfig)({ json });
    this.setState({
      init: true,
    });
  }

  getJSON(path) {
    return this.configHandler.get(path);
  }

  setJSON(path, value) {
    this.configHandler = this.configHandler.update(path, value);
    this.setState({
      timeStamp: Date.now(),
    });
  }

  setMultipleJSON(pathes, value) {
    this.configHandler = pathes.reduce(
      (handler, path) => handler.update(path, value),
      this.configHandler
    );
    this.setState({
      timeStamp: Date.now(),
    });
  }

  // 直式／橫式／預覽圖檔
  get contents() {
    const { layout } = this.props;
    return div({
      className: 'contents',
    },
      layout.map((setting, key) => {
        const comp = builderComponents[setting.component];
        return div({
          key,
          className: `contents--component component--${setting.component}`,
        }, comp instanceof Function && comp(setting));
      })
    );
  }

  get floatingActions() {
    return div({ className: 'floating-actions' },
      this.midButton,
      this.exportButton,
      this.updateButton
    );
  }

  render() {
    const body = div({
      className: 'builder-wrapper',
    },
      this.builderTitle,
      this.state.init ? this.contents : null,
      this.floatingActions,
    );

    return createElement(
      MuiThemeProvider,
      null,
      createElement(StandardPage, null, body)
    );
  }
}

JsonBuilder.propTypes = {
  action: PropTypes.string,
  builderTitle: PropTypes.string,
  configFile: PropTypes.string,
  endpoint: PropTypes.string,
  json: PropTypes.object,
  layout: PropTypes.array,
  pathExport: PropTypes.string,
  previewUrl: PropTypes.string,
};

JsonBuilder.childContextTypes = {
  getJSON: PropTypes.func,
  setJSON: PropTypes.func,
  setMultipleJSON: PropTypes.func,
  updateFile: PropTypes.func,
  apiUpdate: PropTypes.number,
  apiError: PropTypes.number,
  lastApiError: PropTypes.object,
  mid: PropTypes.number,
};
