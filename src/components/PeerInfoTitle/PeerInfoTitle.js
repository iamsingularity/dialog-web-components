/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Icon from '../Icon/Icon';
import Markdown from '../Markdown/Markdown';
import decorators from './decorators';
import styles from './PeerInfoTitle.css';

type Props = {
  title: string,
  userName?: ?string,
  className?: string,
  titleClassName?: string,
  userNameClassName?: string,
  onTitleClick?: ?(event: SyntheticMouseEvent<>) => mixed,
  onUserNameClick?: ?(event: SyntheticMouseEvent<>) => mixed,
  addSpacebars: boolean,
  emojiSize?: number,
  isVerified?: ?boolean,
};

class PeerInfoTitle extends PureComponent<Props> {
  static defaultProps = {
    addSpacebars: false,
  };

  renderVerified() {
    if (this.props.isVerified) {
      return (
        <Icon
          glyph="verified"
          size={this.props.emojiSize}
          className={styles.verifiedIcon}
        />
      );
    }

    return null;
  }

  render() {
    const titleStyle = this.props.onTitleClick
      ? { cursor: 'pointer' }
      : undefined;
    const spacebars = this.props.addSpacebars ? '\u00A0\u00A0' : null;
    const title = (
      <span
        className={this.props.titleClassName}
        style={titleStyle}
        onClick={this.props.onTitleClick}
        title={this.props.title}
      >
        <Markdown
          inline
          emojiSize={this.props.emojiSize}
          decorators={decorators}
          text={this.props.title}
        />
        {spacebars}
      </span>
    );

    if (this.props.userName) {
      const userNameStyle = this.props.onUserNameClick
        ? { cursor: 'pointer' }
        : undefined;

      return (
        <span className={this.props.className}>
          {title}
          <span
            className={this.props.userNameClassName}
            style={userNameStyle}
            onClick={this.props.onUserNameClick}
            title={`@${this.props.userName}`}
          >
            {`@${this.props.userName}`}
            {spacebars}
          </span>
          {this.renderVerified()}
        </span>
      );
    }

    return (
      <span className={this.props.className}>
        {title}
        {this.renderVerified()}
      </span>
    );
  }
}

export default PeerInfoTitle;
