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
// import isEqual from 'react-fast-compare';
import chamilo from '../../../native-base-theme/variables/chamilo';
import Page from '../../components/Page';
import { Text } from '../../components';
import 'moment/locale/fr';
import styles from './styles';
import { MESSAGE_STATUS_UNREAD, MESSAGE_STATUS_NEW } from '../../config/constants';

moment.locale('fr_FR');

type PropsType = {
  navigation: any,
  messagesReceived: any,
  updateMessageStatus: () => void,
  setCurrentPage: () => void,
  currentPage: any,
};

type StateType = {
  currentTab: string,
  refresh: any,
  messagesReceived: any,
};

export default class MessagesReceived extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'received',
      refresh: false,
      // messagesReceived: this.props.messagesReceived.data,
    };
    this.renderMessage = this.renderMessage.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  state: StateType;

  /*

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.messagesReceived.data, state.messagesReceived)) {
      return {
        messagesReceived: [...state.messagesReceived, ...props.messagesReceived.data],
      };
    }
    return null;
  }

  getNextPage() {
    const nextPage = this.props.currentPage + 1;
    if (nextPage <= this.props.messagesReceived.total_pages) {
      this.props.setCurrentPage(this.props.currentPage + 1);
    }
  }
*/
  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.props.navigation.navigate('MessagesSent');
  }

  openMessage(message: any) {
    if (message.msgStatus === MESSAGE_STATUS_UNREAD) {
      this.props.updateMessageStatus(message.id, MESSAGE_STATUS_NEW, this.state.currentTab, () => {
        const { refresh } = this.state;
        this.setState({ refresh: !refresh });
      });
    }
    this.props.navigation.navigate('MessageView', { message, currentTab: this.state.currentTab });
  }
  /*
  shouldComponentUpdate(nextProps) {
    const equal = isEqual(this.props.messagesReceived, nextProps.messagesReceived);
    return !equal;
  }
  */

  renderMessage(row) {
    const message = row.item;
    return (
      <ListItem key={`message${message.id}`} avatar onPress={() => this.openMessage(message)}>
        <Left>
          <Thumbnail
            small
            square
            source={{ uri: message.sender.pictureUri }}
          />
        </Left>
        <Body>
          <Text skipTranslation style={message.msgStatus === MESSAGE_STATUS_UNREAD ? styles.unreadMessage : null}>
            {message.sender.completeName}
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
    const { messagesReceived } = this.props;
    return (
      <View>
        {messagesReceived.length === 0
            && (
              <Text style={styles.noMessage} note>
                noNewMessage
              </Text>
            )}
        <FlatList
          removeClippedSubviews={false}
          data={messagesReceived}
          renderItem={this.renderMessage}
          keyExtractor={message => `${message.id}`}
          extraData={this.state.refresh}
          // onEndReachedThreshold={0.5}
          // onEndReached={() => this.getNextPage()}
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
          active={true}
          onPress={() => {}}
        >
          <Text>received</Text>
        </Button>
        <Button
          last
          active={false}
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
