/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';

export type GroupOnlineProps = {
  online?: number,
  members: number,
};

export function GroupOnline(props: GroupOnlineProps) {
  if (props.online && props.online > 0) {
    return (
      <Text
        id="GroupOnline.online"
        values={{
          online: String(props.online),
          members: String(props.members),
        }}
      />
    );
  }

  return (
    <Text
      id="GroupOnline.members"
      values={{ members: String(props.members) }}
    />
  );
}
