import React from 'react';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import { Alert } from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  View,
  Toast,
} from 'native-base';
import Page from '../../components/Page';
import { Text } from '../../components';
import styles from './styles';
import { MESSAGE_STATUS_NEW } from '../../config/constants';
import translate from '../../services/translate';

type PropsType = {
  navigation: any,
  currentLanguage: string,
  updateMessageStatus: () => void,
  deleteMessage: () => void,
};

export default class MessageView extends React.Component<PropsType> {
  onPressReply(message) {
    this.props.navigation.navigate('NewMessage', {
      receiver: {
        id: message.sender.id,
        name: message.sender.completeName,
      },
      message,
    });
  }

  onPressDelete(message, currentTab) {
    const { currentLanguage } = this.props;
    Alert.alert(
      '',
      translate('confirmDeleteMessage', null, currentLanguage),
      [
        {
          text: translate('confirm', null, currentLanguage),
          onPress:
            () => {
              this.props.deleteMessage(message.id, currentTab, () => {
                Toast.show({ text: translate('messageDeleted', null, currentLanguage), type: 'success' });
                this.props.navigation.goBack();
              });
            },
        },
        {
          text: translate('cancel', null, currentLanguage),
          style: 'cancel',
        },
      ],
    );
  }

  render() {
    const headerProps = {
      left: (
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>),
    };
    const message = this.props.navigation.getParam('message', {});
    const currentTab = this.props.navigation.getParam('currentTab', 'sent');
    return (
      <Page
        onWillFocus={() => this.props.updateMessageStatus(message.id, MESSAGE_STATUS_NEW)}
        contentContainerStyle={styles.contentContainerStyle}
        headerProps={headerProps}
      >
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail
                square
                source={{ uri: currentTab === 'received' ? message.sender.pictureUri : message.receiver.pictureUri }}
              />
            </Left>
            <Body>
              <Text skipTranslation style={styles.user}>
                {currentTab === 'received' ? message.sender.completeName : message.receiver.completeName}
              </Text>
              <Text skipTranslation note>
                {`${message.title} - ${moment(message.sendDate).fromNow()}`}
              </Text>
            </Body>
            <Right />
          </ListItem>
        </List>
        <View
          style={styles.htmlView}
        >
          <HTMLView
            value={message.content}
          />
        </View>
        <View style={styles.rowContainer}>
          {currentTab === 'received'
            && (
              <Button onPress={() => this.onPressReply(message)} iconLeft>
                <Icon type="FontAwesome" name="reply" />
                <Text>reply</Text>
              </Button>
            )
          }
          <Button
            iconLeft
            danger
            onPress={() => this.onPressDelete(message, currentTab)}
          >
            <Icon type="FontAwesome" name="trash" />
            <Text>delete</Text>
          </Button>
        </View>
      </Page>
    );
  }
}
