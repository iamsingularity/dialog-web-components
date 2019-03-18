/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';

import type { DialogMessage } from '../DialogListItem';
import TextMessagePreview from '../SidebarRecentItem/MessagePreview/TextMessagePreview';
import styles from './MessagePreview.css';

export type MessagePreviewProps = {
  className?: string,
  uid: number,
  // info: DialogPeerInfo,
  message: ?DialogMessage,
};

export function MessagePreview(props: MessagePreviewProps) {
  const { message, uid } = props;
  const classes = classNames(styles.container, props.className);

  function renderSender() {
    if (message && message.sender.peer.id === uid) {
      console.log('Sender is me');
      // return <div className={styles.sender}>{info.title}</div>;
    }

    return null;
  }

  return (
    <div className={classes}>
      {renderSender()}
      {message && (
        <div className={styles.message}>
          {message.content.type === 'text' && (
            <TextMessagePreview
              content={message.content}
              className={styles.preview}
              emojiSize={15}
            />
          )}
          {message.content.type === 'service' && (
            <span className={styles.service}>{message.content.text}</span>
          )}
          {message.content.type !== 'service' &&
          message.content.type !== 'text' ? (
            <Text
              className={styles.highlight}
              id={`SidebarRecentItem.${message.content.type}`}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
