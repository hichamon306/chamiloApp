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
  messagesSent: any,
};

type StateType = {
  currentTab: string,
};

export default class MessagesSent extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'sent',
    };
    this.renderMessage = this.renderMessage.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  state: StateType;

  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.props.navigation.navigate('MessagesReceived');
  }

  openMessage(message: any) {
    this.props.navigation.navigate('MessageView', { message, currentTab: this.state.currentTab });
  }

  shouldComponentUpdate(nextProps) {
    const currentCount = this.props.messagesSent.length;
    const nextCount = nextProps.messagesSent.length;
    if (currentCount !== nextCount) {
      return true;
    }
    return false;
  }

  renderMessage(row) {
    const message = row.item;
    return (
      <ListItem key={`message${message.id}`} avatar onPress={() => this.openMessage(message)}>
        <Left>
          <Thumbnail
            small
            square
            source={{ uri: message.receiver.pictureUri }}
          />
        </Left>
        <Body>
          <Text skipTranslation style={message.msgStatus === MESSAGE_STATUS_UNREAD ? styles.unreadMessage : null}>
            {message.receiver.completeName}
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
    const { messagesSent } = this.props;
    const messages = messagesSent;
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
        />
      </View>
    );
  }

  render() {
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
          active={false}
          onPress={() => this.switchTab('received')}
        >
          <Text>received</Text>
        </Button>
        <Button
          last
          active={true}
          onPress={() => {}}
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
