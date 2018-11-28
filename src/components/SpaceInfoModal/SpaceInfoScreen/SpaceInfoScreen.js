/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Text from '@dlghq/react-l10n/src/Text';
import ModalBody from '../../Modal/ModalBody';
import ModalFooter from '../../Modal/ModalFooter';
import ModalClose from '../../Modal/ModalClose';
import ActivityProfile from '../../ActivityProfile/ActivityProfile';
import ActivityList from '../../ActivityList/ActivityList';
import ActivityListItem from '../../ActivityList/ActivityListItem';
import ActivityListSwitcher from '../../ActivityList/ActivityListSwitcher';
import Button from '../../Button/Button';
import Space from '../types';
import styles from './SpaceInfoScreen.css';

type Props = {
  space: Space,
  onClose: () => void,
  isCreator: boolean,
  onlineMessage: string,
  notificationEnabled: boolean,
  onAddMemberClick: () => void,
  onInvitationLinkClick: () => void,
  onMembersScreenClick: () => void,
  onNotificationChange: () => void,
  onLeaveSpaceConfirmClick: () => void,
  onDeleteSpaceConfirmClick: () => void
}

class SpaceInfoScreen extends PureComponent<Props> {
  renderFooter() {
    const { isCreator } = this.props;

    if (isCreator) {
      return (
        <Button
          wide
          theme="danger"
          rounded={false}
          onClick={this.props.onDeleteSpaceConfirmClick}
          id="space_info_screen_delete_space_button"
        >
          <Text id="SpaceInfoModal.info.button.delete" />
        </Button>
      );
    }

    return (
      <Button
        wide
        theme="danger"
        rounded={false}
        onClick={this.props.onLeaveSpaceConfirmClick}
        id="space_info_screen_leave_space_button"
      >
        <Text id="SpaceInfoModal.info.button.leave" />
      </Button>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <ModalBody className={styles.modalBody}>
          <ModalClose
            className={styles.modalClose}
            onClick={this.props.onClose}
            id="space_info_screen_close_button"
          />

          <div className={styles.activityProfileWrapper}>
            <ActivityProfile
              info={this.props.space}
              type="group"
            />
            <ActivityList>
              <ActivityListSwitcher
                id="space_info_screen_notification_switcher"
                value={this.props.notificationEnabled}
                onChange={this.props.onNotificationChange}
                icon={{ glyph: 'notifications', theme: 'danger' }}
              >
                <Text id="SpaceInfoModal.info.notifications" />
              </ActivityListSwitcher>
              <ActivityListItem
                id="space_info_screen_invitation_link"
                onClick={this.props.onInvitationLinkClick}
                icon={{ glyph: 'link', theme: 'success' }}
              >
                <Text id="SpaceInfoModal.info.invitationLink" />
              </ActivityListItem>
              <ActivityListItem
                id="space_info_screen_add_members"
                onClick={this.props.onAddMemberClick}
                icon={{ glyph: 'add_member', theme: 'info' }}
              >
                <Text id="SpaceInfoModal.info.addMembers" />
              </ActivityListItem>
              <ActivityListItem
                id="space_info_screen_members"
                onClick={this.props.onMembersScreenClick}
                icon={{ glyph: 'person', theme: 'warning' }}
              >
                {this.props.onlineMessage}
              </ActivityListItem>
            </ActivityList>
          </div>
        </ModalBody>
        <ModalFooter className={styles.modalFooter}>
          {this.renderFooter()}
        </ModalFooter>
      </div>
    );
  }
}

export default SpaceInfoScreen;
