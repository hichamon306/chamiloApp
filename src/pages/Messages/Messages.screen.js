import React from 'react';
import moment from 'moment';
import { FlatList } from 'react-native';
import {
  Button,
  Segment,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  View,
  Fab,
  Icon,
} from 'native-base';
import chamilo from '../../../native-base-theme/variables/chamilo';
import Page from '../../components/Page';
import { Text } from '../../components';
import 'moment/locale/fr';
import styles from './styles';
import { MESSAGE_STATUS_UNREAD } from '../../config/constants';

moment.locale('fr_FR');

type PropsType = {
  navigation: any,
  isFocused: Boolean,
  getUserMessagesReceived: ()=> void,
  getUserMessagesSent: ()=> void,
  messagesReceived: any,
  messagesSent: any,
};

type StateType = {
  currentTab: string,
};

export default class Messages extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'received',
    };
    this.renderMessage = this.renderMessage.bind(this);
  }

  state: StateType;

  componentDidMount() {
    setTimeout(() => this.onDidFocus(), 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused && this.props.isFocused) {
      // Use the `this.props.isFocused` boolean
      // Call any action
      setTimeout(() => this.onDidFocus(), 1000);
    }
  }

  onDidFocus() {
    this.props.getUserMessagesReceived();
    this.props.getUserMessagesSent();
  }

  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.setState({ currentTab: tabName });
  }

  openMessage(message: any) {
    this.props.navigation.navigate('MessageView', { message, currentTab: this.state.currentTab });
  }

  renderMessage(row) {
    const message = row.item;
    const { currentTab } = this.state;
    // return <Text>{message.title}</Text>;
    return (
      <ListItem key={`message${message.id}`} avatar onPress={() => this.openMessage(message)}>
        <Left>
          <Thumbnail
            small
            square
            source={{ uri: currentTab === 'received' ? message.sender.pictureUri : message.receiver.pictureUri }}
          />
        </Left>
        <Body>
          <Text skipTranslation style={message.msgStatus === MESSAGE_STATUS_UNREAD ? styles.unreadMessage : null}>
            {currentTab === 'received' ? message.sender.completeName : message.receiver.completeName}
          </Text>
          <Text skipTranslation note>
            {`${message.title} - ${message.content.replace(/(<([^>]+)>)/ig, '').trim().substr(0, 30)}...`}
          </Text>
        </Body>
        <Right>
          <Text skipTranslation note>{moment(message.sendDate).fromNow()}</Text>
        </Right>
      </ListItem>
    );
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
                noNewMessage
              </Text>
            )}
        <FlatList
          data={messages}
          renderItem={this.renderMessage}
          keyExtractor={message => message.id}
        >
          {/*messages.map((message, index) => this.renderMessage(message, index))*/}
        </FlatList>
      </View>
    );
  }

  render() {
    const { currentTab } = this.state;
    const postContent = (
      <Fab
        direction="up"
        containerStyle={{ }}
        style={{ backgroundColor: chamilo.brandPrimary }}
        position="bottomRight"
        onPress={() => this.props.navigation.navigate('NewMessage')}
      >
        <Icon name="add" />
      </Fab>
    );
    const segment = (
      <Segment style={styles.segment}>
        <Button
          first
          active={currentTab === 'received'}
          onPress={() => this.switchTab('received')}
        >
          <Text>received</Text>
        </Button>
        <Button
          last
          active={currentTab === 'sent'}
          onPress={() => this.switchTab('sent')}
        >
          <Text>sent</Text>
        </Button>
      </Segment>
    );
    return (
      <Page
        padder={false}
        headerProps
        postContent={postContent}
        postHeader={segment}
      >
        { this.renderMessages() }
      </Page>
    );
  }
}
