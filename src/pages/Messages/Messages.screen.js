import React from 'react';
import moment from 'moment';
import {
  Button,
  Segment,
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  View,
} from 'native-base';
import Page from '../../components/Page';
import 'moment/locale/fr';
import styles from './styles';
import { MESSAGE_STATUS_UNREAD } from '../../config/constants';

moment.locale('fr_FR');

type PropsType = {
  navigation: any,
  getUserMessagesReceived: ()=> void,
  getUserMessagesSent: ()=> void,
  messagesReceived: any,
  messagesSent: any,
};

type StateType = {
  currentTab: string,
};

export default class Courses extends React.Component<PropsType> {
  state: StateType;

  state = {
    currentTab: 'received',
  };

  onWillFocus() {
    this.props.getUserMessagesReceived();
    this.props.getUserMessagesSent();
  }

  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.setState({ currentTab: tabName });
  }

  renderMessages() {
    const { currentTab } = this.state;
    const { messagesReceived, messagesSent } = this.props;
    const messages = currentTab === 'received' ? messagesReceived : messagesSent;
    return (
      <View>
        {messages.length === 0
            && (
              <Text style={styles.noMessage} note>
                {'Vous n\'avez pas de message'}
              </Text>
            )}
        <List>
          {messages.map((message, index) => (
            <ListItem key={`message${index}`} avatar>
              <Left>
                <Thumbnail
                  small
                  source={{ uri: currentTab === 'received' ? message.sender.pictureUri : message.receiver.pictureUri }}
                />
              </Left>
              <Body>
                <Text style={message.msgStatus === MESSAGE_STATUS_UNREAD ? styles.unreadMessage : null}>
                  {currentTab === 'received' ? message.sender.completeName : message.receiver.completeName}
                </Text>
                <Text note>
                  {`${message.title} - ${message.content.replace(/(<([^>]+)>)/ig, '').trim().substr(0, 30)}...`}
                </Text>
              </Body>
              <Right>
                <Text note>{moment(message.sendDate).fromNow()}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }

  render() {
    const { currentTab } = this.state;
    const footerProps = {
      navigation: this.props.navigation,
    };
    const headerProps = {
      hasSegment: true,
    };
    const postHeader = (
      <Segment>
        <Button
          first
          active={currentTab === 'received'}
          onPress={() => this.switchTab('received')}
        >
          <Text>Reçus</Text>
        </Button>
        <Button
          last
          active={currentTab === 'sent'}
          onPress={() => this.switchTab('sent')}
        >
          <Text>Envoyés</Text>
        </Button>
      </Segment>
    );
    return (
      <Page
        postHeader={postHeader}
        footerProps={footerProps}
        headerProps={headerProps}
        onWillFocus={() => this.onWillFocus()}
      >
        { this.renderMessages() }
      </Page>
    );
  }
}
