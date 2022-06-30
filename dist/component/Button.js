"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _web = _interopRequireDefault(require("https://esm.sh/web3@1.7.4"));

var _privatepartyjs = _interopRequireDefault(require("https://esm.sh/privatepartyjs@0.0.30"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(props) {
  const login = props.login ? props.login : "login";
  const logout = props.logout ? props.logout : "logout";
  const host = props.host ? props.host : null;
  const party = (0, _react.useRef)(null);
  const [session, setSession] = (0, _react.useState)({});

  const toggle = async () => {
    if (session) setSession(await party.current.disconnect(props.role));else setSession(await party.current.connect(props.role));
  };

  (0, _react.useEffect)(() => {
    const web3 = new _web.default(window.ethereum);
    party.current = new _privatepartyjs.default({
      web3,
      host
    });

    (async () => {
      setSession(await party.current.session(props.role));
    })();
  }, []);
  (0, _react.useEffect)(() => {
    props.onSession(session);
  }, [session]);
  return /*#__PURE__*/React.createElement("button", {
    style: props.style,
    onClick: toggle
  }, session ? logout : login);
}

var _default = Button;
exports.default = _default;