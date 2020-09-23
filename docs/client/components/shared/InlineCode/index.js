import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';
import clsx from 'clsx';
import styles from './styles.css';

export default class InlineCode extends Component {
  static propTypes = {
    code: PropTypes.string,
  };

  shouldComponentUpdate = shouldComponentUpdate; // eslint-disable-line no-redeclare

  render() {
    const { className } = this.props;
    const combinedRootClassName = clsx(styles.root, className);
    return (
      <span className={combinedRootClassName}>
        <code
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: this.props.code }}
        />
      </span>
    );
  }
}
