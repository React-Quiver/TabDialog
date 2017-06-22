var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Close from 'material-ui/svg-icons/navigation/close';
import Action from 'material-ui/svg-icons/action/done';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

// styles
import styles from './styles';

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
      actionIsHidden: false,
      stepIndex: 0
    };
    return _this;
  }

  _createClass(TabDialog, [{
    key: 'getItemSelected',
    value: function getItemSelected(color) {
      return {
        fontSize: '16px',
        lineHeight: '50px',
        paddingLeft: '15px',
        paddingRight: '15px',
        cursor: 'pointer',
        color: color || 'black',
        borderBottom: color ? 'solid 2px ' + color : 'solid 2px black'
      };
    }
  }, {
    key: 'getTabs',
    value: function getTabs() {
      var _this2 = this;

      var stepIndex = this.state.stepIndex;

      console.log(stepIndex);
      var childs = this.props.children;
      var JSX = [];
      var i = 0;

      if (childs.length) {
        var _loop = function _loop(k) {
          if (childs.hasOwnProperty(k)) {
            var child = childs[k];
            JSX.push(React.createElement(
              'div',
              {
                key: k,
                style: stepIndex === k ? _this2.getItemSelected(child.props.color) : styles.menuItem,
                onClick: function onClick() {
                  _this2.setState({ stepIndex: k });
                }
              },
              child.props.label || 'Tab ' + k
            ));
            i++;
          }

          _this2.state.childCount = i;
        };

        for (var k in childs) {
          _loop(k);
        }
      } else {
        JSX.push(React.createElement(
          'div',
          {
            key: 0,
            style: stepIndex === 0 ? this.getItemSelected(childs.props.color) : styles.menuItem,
            onClick: function onClick() {
              _this2.setState({ stepIndex: 0 });
            }
          },
          childs.props.label
        ));

        this.state.childCount = 1;
      }
      return JSX;
    }
  }, {
    key: 'getChildren',
    value: function getChildren() {
      var _state = this.state,
          stepIndex = _state.stepIndex,
          childCount = _state.childCount;

      var child = this.props.children;
      if (childCount > 1) {
        child = child[stepIndex];
      }
      var childWithProps = React.cloneElement(child, {
        ref: 'component' + stepIndex,
        callback: this.callback.bind(this),
        setActionIsDisabled: this.setActionIsDisabled.bind(this),
        setActionIsHidden: this.setActionIsHidden.bind(this),
        close: this.props.close
      });

      return childWithProps;
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
    key: 'getBlur',
    value: function getBlur() {
      var _props3 = this.props,
          lightBlur = _props3.lightBlur,
          darkBlur = _props3.darkBlur;


      if (lightBlur) {
        return {
          backdropFilter: 'blur(20px) saturate(180%)',
          webkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(255,255,255,0.7)'
        };
      }

      if (darkBlur) {
        return {
          backdropFilter: 'blur(20px) saturate(180%)',
          webkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(0,0,0,0.7)'
        };
      }

      return undefined;
    }
  }, {
    key: 'getHeight',
    value: function getHeight(showTitle, showTabMenu) {
      if (showTitle && showTabMenu) {
        return 108;
      }

      if (showTitle) {
        return 68;
      }

      return 48;
    }
  }, {
    key: 'getPadding',
    value: function getPadding(showTitle, showTabMenu) {
      if (showTitle && showTabMenu) {
        return 120;
      }

      if (showTitle) {
        return 68;
      }

      return 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          open = _props4.open,
          del = _props4.del,
          delLabel = _props4.delLabel,
          delIcon = _props4.delIcon,
          closeLabel = _props4.closeLabel,
          closeIcon = _props4.closeIcon,
          actionIcon = _props4.actionIcon,
          title = _props4.title,
          action = _props4.action,
          actionLabel = _props4.actionLabel,
          width = _props4.width;
      var _state2 = this.state,
          confirmDeleteOpen = _state2.confirmDeleteOpen,
          childCount = _state2.childCount,
          actionIsDisabled = _state2.actionIsDisabled,
          actionIsHidden = _state2.actionIsHidden;
      var muiTheme = this.context.muiTheme;

      var palette = muiTheme ? muiTheme.rawTheme.palette : undefined;

      var showTabMenu = this.state.childCount > 1 || this.props.children.props.label;
      var showTitle = this.props.title;

      var actions = [];

      if (del) {
        actions.push(React.createElement(FlatButton, {
          key: 'del',
          label: delLabel !== undefined ? delLabel : 'Delete',
          style: { color: 'white', float: 'left' },
          backgroundColor: '#F44336',
          hoverColor: '#D32F2F',
          onTouchTap: this.openConfirmDelete.bind(this),
          icon: delIcon !== undefined ? delIcon : React.createElement(Delete, null)
        }));
      }

      actions.push(React.createElement(FlatButton, {
        key: 'close',
        label: closeLabel !== undefined ? closeLabel : 'Close',
        hoverColor: '#9e9e9e',
        backgroundColor: '#bdbdbd',
        style: { marginRight: '15px', color: 'white' },
        onTouchTap: this.close.bind(this),
        icon: closeIcon !== undefined ? closeIcon : React.createElement(Close, null),
        primary: true
      }));

      if (action) {
        actions.push(React.createElement(FlatButton, {
          key: 'create',
          label: actionLabel !== undefined ? actionLabel : 'Create',
          style: {
            color: 'white',
            opacity: actionIsDisabled ? 0.5 : 1,
            display: actionIsHidden ? 'none' : undefined
          },
          disabled: actionIsDisabled,
          backgroundColor: '#2196f3',
          hoverColor: '#1976d2',
          icon: actionIcon !== undefined ? actionIcon : React.createElement(Action, null),
          onTouchTap: this.action.bind(this)
        }));
      }

      var JSX = React.createElement(
        'div',
        null,
        React.createElement(
          Dialog,
          {
            overlayStyle: this.getBlur(),
            autoScrollBodyContent: true,
            actions: actions,
            modal: false,
            open: open,
            onRequestClose: this.close.bind(this),
            contentStyle: { width: width || '70%', maxWidth: 'none', minWidth: width || 600 },
            actionsContainerStyle: { border: 'none' },
            titleStyle: { color: 'white', background: palette ? palette.primary1Color : '#2196f3' },
            bodyStyle: { padding: 0 }
          },
          React.createElement(
            'div',
            {
              style: { padding: 20 },
              onKeyPress: function onKeyPress(e) {
                if (e.key === 'Enter') {
                  if (_this3.props.action) {
                    _this3.action.call(_this3);
                  } else {
                    _this3.close.call(_this3);
                  }
                }
              }
            },
            showTitle || showTabMenu ? React.createElement(
              Toolbar,
              {
                style: {
                  borderBottom: '1px solid #aaaaaa',
                  height: this.getHeight(showTitle, showTabMenu),
                  width: '100%',
                  position: 'fixed',
                  overflowY: 'scroll',
                  zIndex: 100000,
                  marginTop: -20,
                  marginLeft: -20,
                  paddingTop: showTitle ? 55 : 20,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  webkitBackdropFilter: 'blur(20px) saturate(180%)',
                  background: 'rgba(255,255,255,0.8)'
                }
              },
              showTitle ? React.createElement(
                'div',
                {
                  style: {
                    color: 'black',
                    fontSize: 26,
                    fontWeight: 600,
                    position: 'absolute',
                    top: 20,
                    left: 20
                  }
                },
                this.props.title
              ) : null,
              showTabMenu ? React.createElement(
                'div',
                { style: { overflow: 'scroll' } },
                React.createElement(
                  ToolbarGroup,
                  { firstChild: true, style: { marginLeft: '-10px' } },
                  this.getTabs()
                ),
                React.createElement(ToolbarGroup, { lastChild: true })
              ) : null
            ) : null,
            React.createElement(
              'div',
              { style: { paddingTop: this.getPadding(showTitle, showTabMenu) } },
              this.getChildren()
            )
          )
        ),
        React.createElement(
          Dialog,
          {
            overlayStyle: this.getBlur(),
            actions: [React.createElement(FlatButton, {
              key: 'Cancel',
              label: 'Cancel',
              hoverColor: '#90A4AE',
              backgroundColor: '#CFD8DC',
              style: { marginRight: '15px' },
              onTouchTap: this.closeConfirmDelete.bind(this),
              primary: true
            }), React.createElement(FlatButton, {
              key: 'Confirm',
              label: 'Confirm',
              backgroundColor: palette ? palette.primary1Color : '#2196f3',
              hoverColor: palette ? palette.primary3Color : '#1976d2',
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

      return React.createElement(
        MuiThemeProvider,
        { muiTheme: this.context.muiTheme },
        JSX
      );
    }
  }]);

  return TabDialog;
}(Component);

TabDialog.propTypes = {
  del: PropTypes.func,
  delLabel: PropTypes.string,
  delIcon: PropTypes.any,

  action: PropTypes.func,
  actionLabel: PropTypes.string,
  actionIcon: PropTypes.any,

  close: PropTypes.func,
  closeLabel: PropTypes.string,
  closeIcon: PropTypes.any,

  open: PropTypes.bool,
  children: PropTypes.any,
  refresh: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.any,

  lightBlur: PropTypes.bool,
  darkBlur: PropTypes.bool
};
TabDialog.contextTypes = {
  muiTheme: PropTypes.object.isRequired
};
export default TabDialog;