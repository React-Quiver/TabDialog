'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _delete2 = require('material-ui/svg-icons/action/delete');

var _delete3 = _interopRequireDefault(_delete2);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

var _done = require('material-ui/svg-icons/action/done');

var _done2 = _interopRequireDefault(_done);

var _Tabs = require('material-ui/Tabs');

var _reactSwipeableViews = require('react-swipeable-views');

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// material-ui


// open source


var TabDialog = function (_Component) {
  _inherits(TabDialog, _Component);

  function TabDialog(props) {
    _classCallCheck(this, TabDialog);

    var _this = _possibleConstructorReturn(this, (TabDialog.__proto__ || Object.getPrototypeOf(TabDialog)).call(this, props));

    _this.state = {
      confirmDeleteOpen: false,
      hasChanged: false,
      slideIndex: 0,
      childCount: _this.props.children.length || 1,
      callbackReceived: 0,
      actionIsDisabled: false,
      actionIsHidden: false
    };
    return _this;
  }

  _createClass(TabDialog, [{
    key: 'getTabs',
    value: function getTabs() {
      var childs = this.props.children;
      var JSX = [];
      var i = 0;

      if (childs.length) {
        for (var k in childs) {
          if (childs.hasOwnProperty(k)) {
            var child = childs[k];
            JSX.push(_react2.default.createElement(_Tabs.Tab, {
              key: k,
              label: child.props.label,
              value: i
            }));
            i++;
          }

          this.state.childCount = i;
        }
      } else {
        JSX.push(_react2.default.createElement(_Tabs.Tab, {
          key: 1,
          label: childs.props.label,
          value: i
        }));

        this.state.childCount = 1;
      }
      return JSX;
    }
  }, {
    key: 'getChildren',
    value: function getChildren() {
      var childs = this.props.children;
      var JSX = [];

      if (childs.length) {
        for (var k in childs) {
          if (childs.hasOwnProperty(k)) {
            var child = childs[k];
            var childWithProps = _react2.default.cloneElement(child, {
              ref: 'component' + k,
              callback: this.callback.bind(this)
            });
            JSX.push(childWithProps);
          }
        }
      } else {
        var _childWithProps = _react2.default.cloneElement(childs, {
          ref: 'component1',
          callback: this.callback.bind(this),
          setActionIsDisabled: this.setActionIsDisabled.bind(this),
          setActionIsHidden: this.setActionIsHidden.bind(this),
          close: this.props.close
        });
        JSX.push(_childWithProps);
      }

      return JSX;
    }
  }, {
    key: 'openConfirmDelete',
    value: function openConfirmDelete() {
      this.setState({ confirmDeleteOpen: true });
    }
  }, {
    key: 'closeConfirmDelete',
    value: function closeConfirmDelete() {
      this.setState({ confirmDeleteOpen: false });
    }
  }, {
    key: 'callback',
    value: function callback(hasChanged) {
      var refresh = this.props.refresh;

      console.log('Callback ' + this.state.callbackReceived + '/' + this.state.childCount + ' : ' + hasChanged); // eslint-disable-line
      this.state.hasChanged = this.state.hasChanged || hasChanged;
      this.state.callbackReceived += 1;
      if (this.state.callbackReceived === this.state.childCount) {
        if (this.state.hasChanged) {
          console.log('TabDialog: Refresh'); // eslint-disable-line
          refresh();
          this.state.hasChanged = false;
        } else {
          console.log('TabDialog: Nothing changed'); // eslint-disable-line
        }
        this.state.callbackReceived = 0;
      }
    }
  }, {
    key: 'delete',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _props, del, close, refresh;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _props = this.props, del = _props.del, close = _props.close, refresh = _props.refresh;
                _context.next = 3;
                return del();

              case 3:
                this.closeConfirmDelete();
                close();
                refresh();

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _delete() {
        return _ref.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'close',
    value: function close() {
      var close = this.props.close;

      for (var k in this.refs) {
        if (this.refs.hasOwnProperty(k)) {
          var child = this.refs[k];
          if (child.userDidCancel) {
            child.userDidCancel();
          }
        }
      }
      close();
    }
  }, {
    key: 'action',
    value: function action() {
      var _props2 = this.props,
          action = _props2.action,
          close = _props2.close;
      var childCount = this.state.childCount;


      for (var k in this.refs) {
        if (this.refs.hasOwnProperty(k)) {
          var child = this.refs[k];
          if (child.userDidAction) {
            child.userDidAction();
          }
        }
      }

      if (childCount > 1) {
        close();
      }

      action();
    }
  }, {
    key: 'setActionIsDisabled',
    value: function setActionIsDisabled(val) {
      this.setState({ actionIsDisabled: val });
    }
  }, {
    key: 'setActionIsHidden',
    value: function setActionIsHidden(val) {
      this.setState({ actionIsHidden: val });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          open = _props3.open,
          del = _props3.del,
          delLabel = _props3.delLabel,
          delIcon = _props3.delIcon,
          closeLabel = _props3.closeLabel,
          closeIcon = _props3.closeIcon,
          actionIcon = _props3.actionIcon,
          title = _props3.title,
          action = _props3.action,
          actionLabel = _props3.actionLabel,
          width = _props3.width;
      var _state = this.state,
          confirmDeleteOpen = _state.confirmDeleteOpen,
          childCount = _state.childCount,
          actionIsDisabled = _state.actionIsDisabled,
          actionIsHidden = _state.actionIsHidden;


      var actions = [];

      if (del) {
        actions.push(_react2.default.createElement(_FlatButton2.default, {
          labelColor: 'white',
          label: delLabel !== undefined ? delLabel : 'Delete',
          style: { color: 'white', float: 'left' },
          backgroundColor: '#F44336',
          hoverColor: '#D32F2F',
          onTouchTap: this.openConfirmDelete.bind(this),
          icon: delIcon !== undefined ? delIcon : _react2.default.createElement(_delete3.default, null)
        }));
      }

      actions.push(_react2.default.createElement(_FlatButton2.default, {
        label: closeLabel !== undefined ? closeLabel : 'Close',
        hoverColor: '#90A4AE',
        backgroundColor: '#CFD8DC',
        style: { marginRight: '15px' },
        onTouchTap: this.close.bind(this),
        icon: closeIcon !== undefined ? closeIcon : _react2.default.createElement(_close2.default, null),
        primary: true
      }));

      if (action) {
        actions.push(_react2.default.createElement(_FlatButton2.default, {
          labelColor: 'white',
          label: actionLabel !== undefined ? actionLabel : 'Create',
          style: {
            color: 'white',
            opacity: actionIsDisabled ? 0.5 : 1,
            display: actionIsHidden ? 'none' : undefined
          },
          disabled: actionIsDisabled,
          backgroundColor: '#2196f3',
          hoverColor: '#1976d2',
          icon: actionIcon !== undefined ? actionIcon : _react2.default.createElement(_done2.default, null),
          onTouchTap: this.action.bind(this)
        }));
      }

      var JSX = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Dialog2.default,
          {
            autoScrollBodyContent: true,
            actions: actions,
            modal: false,
            open: open,
            onRequestClose: this.close.bind(this),
            contentStyle: { width: width || '70%', maxWidth: 'none', minWidth: width || 600 },
            titleStyle: { color: 'white', background: '#2196f3' },
            bodyStyle: { padding: 0 },
            title: title
          },
          _react2.default.createElement(
            'div',
            {
              onKeyPress: function onKeyPress(e) {
                if (e.key === 'Enter') {
                  if (_this2.props.action) {
                    _this2.action.call(_this2);
                  } else {
                    _this2.close.call(_this2);
                  }
                }
              }
            },
            childCount === 1 ? _react2.default.createElement(
              'div',
              { style: { padding: 15 } },
              this.props.children ? this.getChildren() : null
            ) : _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _Tabs.Tabs,
                {
                  inkBarStyle: { background: 'white' },
                  tabItemContainerStyle: { background: '#333333' },
                  onChange: function onChange(value) {
                    _this2.setState({ slideIndex: value });
                  },
                  value: this.state.slideIndex
                },
                this.getTabs()
              ),
              _react2.default.createElement(
                'div',
                {
                  style: { padding: 15, minHeight: 600 }
                },
                _react2.default.createElement(
                  _reactSwipeableViews2.default,
                  {
                    style: { height: '100%' },
                    index: this.state.slideIndex,
                    onChange: function onChange(value) {
                      _this2.setState({ slideIndex: value });
                    }
                  },
                  this.props.children ? this.getChildren() : null
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _Dialog2.default,
          {
            actions: [_react2.default.createElement(_FlatButton2.default, {
              label: 'Cancel',
              hoverColor: '#90A4AE',
              backgroundColor: '#CFD8DC',
              style: { marginRight: '15px' },
              onTouchTap: this.closeConfirmDelete.bind(this),
              primary: true
            }), _react2.default.createElement(_FlatButton2.default, {
              label: 'Confirm',
              backgroundColor: '#F44336',
              hoverColor: '#D32F2F',
              style: { marginRight: '15px', color: 'white' },
              onTouchTap: this.delete.bind(this)
            })],
            modal: false,
            open: confirmDeleteOpen,
            onRequestClose: this.closeConfirmDelete.bind(this),
            title: 'Are you sure to do this action ?'
          },
          'This action is non reversible'
        )
      );

      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: this.context.muiTheme },
        JSX
      );
    }
  }]);

  return TabDialog;
}(_react.Component);

TabDialog.propTypes = {
  del: _react.PropTypes.func,
  delLabel: _react.PropTypes.string,
  delIcon: _react.PropTypes.any,

  action: _react.PropTypes.func,
  actionLabel: _react.PropTypes.string,
  actionIcon: _react.PropTypes.any,

  close: _react.PropTypes.func,
  closeLabel: _react.PropTypes.string,
  closeIcon: _react.PropTypes.any,

  open: _react.PropTypes.bool,
  children: _react.PropTypes.any,
  refresh: _react.PropTypes.func,
  title: _react.PropTypes.string,
  width: _react.PropTypes.any
};
TabDialog.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = TabDialog;
module.exports = exports['default'];