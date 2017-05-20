import React, { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './styles';

export default class TabDialog extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    const { text } = this.props;
    return (
      <MuiThemeProvider>
        <Paper style={styles.div}>
          { text || 'Hay.'}
        </Paper>
      </MuiThemeProvider>
    );
  }
}
