/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import classNames from 'classnames';
import { L10n } from '@dlghq/react-l10n';
import { Icon } from '@dlghq/dialog-ui';

import Avatar from '../Avatar/Avatar';
import getAvatarPlaceholder from '../Avatar/utils/getAvatarPlaceholder';
import { PeerInfoTitle } from '../PeerInfoTitle/PeerInfoTitle';
import { MessagePreview } from '../MessagePreview/MessagePreview';
import styles from './DialogListItem.css';

export type Peer = {
  type:
    | 'PEERTYPE_UNKNOWN'
    | 'PEERTYPE_PRIVATE'
    | 'PEERTYPE_GROUP'
    | 'PEERTYPE_ENCRYPTEDPRIVATE'
    | 'PEERTYPE_SIP',
  id: number,
};

export type DialogPeerInfo = {
  peer: Peer,
  title: string,
  avatar: ?string,
};

export type DialogMessage = {
  sender: DialogPeerInfo,
  content:
    | {
        type:
          | 'contact'
          | 'document'
          | 'location'
          | 'photo'
          | 'sticker'
          | 'voice'
          | 'video'
          | 'unsupported'
          | 'deleted',
      }
    | {
        type: 'service' | 'text',
        text: string,
      },
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
  onSelect?: (peer: Peer) => mixed,
};

export function DialogListItem(props: DialogListItemProps) {
  const {
    uid,
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
    onSelect && onSelect(info.peer);
  }

  return (
    <L10n>
      {({ l10n: { formatText } }) => (
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
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div className={styles.titleBlock}>
                <PeerInfoTitle title={info.title} className={styles.title} />
                {isPinned && (
                  <Icon
                    glyph="new_pin"
                    className={styles.icon}
                    width={20}
                    ariaLabel="pinned"
                    title={formatText('DialogListItem.pinned')}
                  />
                )}
                {isMuted && (
                  <Icon
                    glyph="new_mute"
                    className={styles.icon}
                    width={20}
                    ariaLabel="muted"
                    title={formatText('DialogListItem.muted')}
                  />
                )}
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.message}>
                {message && (
                  <MessagePreview
                    uid={uid}
                    message={message}
                    withSender={info.peer.type === 'group'}
                  />
                )}
              </div>
              {counter && counter !== 0 ? (
                <div className={styles.counter}>{counter}</div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </L10n>
  );
}
