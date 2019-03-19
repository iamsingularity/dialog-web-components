/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React, { type Node } from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';

import {
  DialogListItem,
  type Peer,
  type DialogPeerInfo,
  type DialogMessage,
} from '../DialogListItem';
import styles from './DialogList.css';

export type Dialog = {
  uid: number,
  info: DialogPeerInfo,
  message?: DialogMessage,
  counter: number,
  selected: boolean,
  isMuted: boolean,
  isPinned: boolean,
};

export type DialogListProps = {
  uid: number,
  className?: string,
  dialogs: Array<Dialog>,
  onSelect?: (peer: Peer) => mixed,
  onRender?: (visiblePeers: Array<Peer>) => mixed,
  renderItem: (dialog: Dialog) => Node,
};

export function DialogList({
  dialogs,
  className,
  uid,
  onSelect,
  onRender,
  renderItem,
}: DialogListProps) {
  const classes = classNames(styles.container, className);

  function getItem(index: number): Dialog {
    return dialogs[index];
  }

  function handleRowsRendered({ startIndex, stopIndex }) {
    onRender &&
      onRender(
        dialogs
          .slice(startIndex, stopIndex + 1)
          .map((dialog) => dialog.info.peer),
      );
  }

  function renderRow({ index, key, style }) {
    const { info, isPinned, isMuted, counter, selected, message } = getItem(
      index,
    );

    if (renderItem) {
      return (
        <div key={key} style={style}>
          {renderItem({
            uid,
            info,
            message,
            counter,
            selected,
            isMuted,
            isPinned,
            onSelect,
          })}
        </div>
      );
    }

    return (
      <div key={key} style={style}>
        <DialogListItem
          uid={uid}
          info={info}
          counter={counter}
          selected={selected}
          isPinned={isPinned}
          isMuted={isMuted}
          message={message}
          onSelect={onSelect}
        />
      </div>
    );
  }

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          className={classes}
          width={width}
          height={height}
          rowCount={dialogs.length}
          rowHeight={68}
          overscanRowCount={20}
          onRowsRendered={handleRowsRendered}
          rowRenderer={renderRow}
        />
      )}
    </AutoSizer>
  );
}
