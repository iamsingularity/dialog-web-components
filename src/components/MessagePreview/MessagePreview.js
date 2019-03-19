/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';

import type { DialogMessage } from '../DialogListItem';
import getInlineText from '../SidebarRecentItem/utils/getInlineText';
import decorators from '../SidebarRecentItem/utils/decorators';
import Markdown from '../Markdown/Markdown';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import styles from './MessagePreview.css';

export type MessagePreviewProps = {
  className?: string,
  uid: number,
  withSender: boolean,
  message: DialogMessage,
};

export function MessagePreview({
  message: { sender, content },
  uid,
  withSender,
  className,
}: MessagePreviewProps) {
  const classes = classNames(styles.container, className);

  function renderTextMessage() {
    if (content.type === 'text' || content.type === 'service') {
      if (content.text.startsWith('```')) {
        return <Text className={styles.highlight} id="MessagePreview.code" />;
      }

      if (content.text.startsWith('>')) {
        return <Text className={styles.highlight} id="MessagePreview.quote" />;
      }

      return (
        <Markdown
          inline
          className={styles.text}
          text={getInlineText(content.text)}
          decorators={decorators}
        />
      );
    }

    return null;
  }

  function renderPreview() {
    switch (content.type) {
      case 'service':
        return <span className={styles.service}>{content.text}</span>;

      case 'text':
        return renderTextMessage();

      case 'unsupported':
        console.warn('[MessagePreview]: unsupported message type');

        return null;

      default:
        return (
          <Text
            className={styles.highlight}
            id={`MessagePreview.type.${content.type}`}
          />
        );
    }
  }

  function renderSender() {
    if (!withSender || !sender) {
      return null;
    }

    return (
      <span className={styles.sender}>
        {sender.peer.id === uid ? (
          <Text id="MessagePreview.you" />
        ) : (
          <PeerInfoTitle title={sender.title} />
        )}
        {': '}
        <br />
      </span>
    );
  }

  return (
    <div className={classes}>
      {renderSender()}
      <span className={styles.preview}>{renderPreview()}</span>
    </div>
  );
}

MessagePreview.defaultProps = {
  withSender: true,
};
