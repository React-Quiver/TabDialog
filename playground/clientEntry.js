import React from 'react';
import ReactDOM from 'react-dom';
import Playground from 'component-playground';
import TabDialog from '../src';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const TabDialogExample = require('raw!../src/TabDialog.example');

const Index = () => (
  <div className="component-documentation">
    <Playground codeText={TabDialogExample} scope={{ React, TabDialog }} />
  </div>
);

ReactDOM.render(<Index />, document.getElementById('root'));

if (__ONBUILD_REACT_PERF__) {
  window.Perf = require('react-addons-perf');
}
