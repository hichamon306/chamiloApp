import React from 'react';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import {
  Button,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Text,
  H1,
  View,
} from 'native-base';
import Page from '../../components/Page';
import styles from './styles';
import { MESSAGE_STATUS_NEW } from '../../config/constants';

type PropsType = {
  navigation: any,
  updateMessageStatus: () => void,
};

export default class CustomWebView extends React.Component<PropsType> {
  onPressReply(message) {
    this.props.navigation.navigate('NewMessage', {
      receiver: {
        id: message.sender.id,
        name: message.sender.completeName,
      },
      message,
    });
  }

  render() {
    const headerProps = {
      left: (
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>),
    };
    const message = this.props.navigation.getParam('message', {});
    const currentTab = this.props.navigation.getParam('currentTab', {});
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
              <H1>
                {currentTab === 'received' ? message.sender.completeName : message.receiver.completeName}
              </H1>
              <Text note>
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
                <Text>Répondre</Text>
              </Button>
            )
          }
          <Button iconLeft danger>
            <Icon type="FontAwesome" name="trash" />
            <Text>Supprimer</Text>
          </Button>
        </View>
      </Page>
    );
  }
}
