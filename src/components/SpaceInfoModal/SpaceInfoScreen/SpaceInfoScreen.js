/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Text from '@dlghq/react-l10n/src/Text';

import ModalHeader from '../../Modal/ModalHeader';
import ModalBody from '../../Modal/ModalBody';
import ModalFooter from '../../Modal/ModalFooter';
import ModalClose from '../../Modal/ModalClose';
import Trigger from '../../Trigger/Trigger';
import Dropdown from '../../Dropdown/Dropdown';
import DropdownItem from '../../Dropdown/DropdownItem';
import ActivityProfile from '../../ActivityProfile/ActivityProfile';
import ActivityList from '../../ActivityList/ActivityList';
import ActivityListItem from '../../ActivityList/ActivityListItem';
import ActivityListSwitcher from '../../ActivityList/ActivityListSwitcher';
import IconButton from '../../IconButton/IconButton';
import Button from '../../Button/Button';
import styles from './SpaceInfoScreen.css';

type Props = {
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
          // loading={this.isPending()}
          // disabled={!this.isChanged() || this.isPending()}
          onClick={this.props.onDeleteSpaceConfirmClick}
          id="space_info_screen_delete_space_button"
        >
          <Text id="SpaceInfoModal.delete" />
        </Button>
      );
    }

    return (
      <Button
        wide
        theme="danger"
        rounded={false}
        // loading={this.isPending()}
        // disabled={!this.isChanged() || this.isPending()}
        onClick={this.props.onLeaveSpaceConfirmClick}
        id="space_info_screen_leave_space_button"
      >
        <Text id="SpaceInfoModal.leave" />
      </Button>
    );
  }

  render() {
    const group = {
      name: 'Sub space',
      shortname: 'subspace',
      creator: 'Steve Rodgers',
      avatar: null,
      bigAvatar: null,
      placeholder: 'lblue',
      adminId: 1001
    };
    const onAboutEdit = () => console.debug('Edit about action');

    return (
      <div className={styles.container}>
        <ModalBody className={styles.modalBody}>
          <ModalClose
            className={styles.modalClose}
            // pending={this.isPending()}
            onClick={this.props.onClose}
            id="space_info_screen_close_button"
          />

          <div className={styles.activityProfileWrapper}>
            <ActivityProfile
              info={group}
              onAboutEdit={onAboutEdit}
              type="group"
            >
              <div style={{ margin: '0px 5px', display: 'inline-block' }}>
                <IconButton
                  glyph="add_member"
                  key="more"
                  size="large"
                  onClick={this.props.onAddMemberClick}
                />
              </div>
              <div style={{ margin: '0px 5px', display: 'inline-block' }}>
                <IconButton
                  glyph="edit"
                  key="more"
                  size="large"
                  onClick={this.props.onAddMemberClick}
                />
              </div>
              <div style={{ margin: '0px 5px', display: 'inline-block' }}>
                <IconButton
                  glyph="more_outline"
                  key="more"
                  size="large"
                  onClick={this.props.onAddMemberClick}
                />
              </div>
            </ActivityProfile>
            <ActivityList>
              <ActivityListSwitcher
                value={this.props.notificationEnabled}
                onChange={this.props.onNotificationChange}
                icon={{ glyph: 'notifications', theme: 'danger' }}
              >
                Notifications
              </ActivityListSwitcher>
              <ActivityListItem
                onClick={this.props.onInvitationLinkClick}
                icon={{ glyph: 'link', theme: 'success' }}
              >
                Invitation link
              </ActivityListItem>
              <ActivityListItem
                onClick={this.props.onMembersScreenClick}
                icon={{ glyph: 'person', theme: 'warning' }}
                id="activity_list_members"
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
