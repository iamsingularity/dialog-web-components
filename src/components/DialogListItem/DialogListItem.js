/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import type { Peer, MessageContent } from '@dlghq/dialog-types';
import { Icon } from '@dlghq/dialog-ui';

import Avatar from '../Avatar/Avatar';
import getAvatarPlaceholder from '../Avatar/utils/getAvatarPlaceholder';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import { MessagePreview } from '../MessagePreview/MessagePreview';
import styles from './DialogListItem.css';

export type DialogPeerInfo = {
  peer: Peer,
  title: string,
  avatar: ?string,
};

export type DialogMessage = {
  sender: DialogPeerInfo,
  content: MessageContent,
};

export type DialogListItemProps = {
  uid: number,
  info: DialogPeerInfo,
  message?: DialogMessage,
  counter: number,
  selected: boolean,
  isMuted: boolean,
  isPinned: boolean,
  className?: string,
  onSelect: (peer: Peer) => mixed,
};

export function DialogListItem(props: DialogListItemProps) {
  const {
    info,
    message,
    selected,
    counter,
    isMuted,
    isPinned,
    className,
    onSelect,
  } = props;
  const classes = classNames(
    styles.container,
    {
      [styles.selected]: selected,
      [styles.muted]: isMuted,
    },
    className,
  );

  function handleClick(): void {
    onSelect(info.peer);
  }

  return (
    <div className={classes} onClick={handleClick}>
      <div className={styles.avatarBlock}>
        <Avatar
          size={44}
          title={info.title}
          image={info.avatar}
          square={info.peer.type === 'group'}
          placeholder={getAvatarPlaceholder(info.peer.id)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.titleBlock}>
          <PeerInfoTitle title={info.title} className={styles.title} />
          {isPinned ? (
            <Icon
              glyph="new_pin"
              className={styles.icon}
              width={20}
              ariaLabel="pinned"
              title="Pinned"
            />
          ) : null}
          {isMuted ? (
            <Icon
              glyph="new_mute"
              className={styles.icon}
              width={20}
              ariaLabel="muted"
              title="Pinned"
            />
          ) : null}
        </div>
        <div className={styles.messageBlock}>
          <MessagePreview message={message} className={styles.message} />
        </div>
      </div>
      <div className={styles.side}>
        <div className={styles.statusBlock} />
        <div className={styles.counterBlock}>
          {Boolean(counter) ? (
            <div className={styles.counter}>{counter}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
