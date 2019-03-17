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
} from 'native-base';
import Page from '../../components/Page';
import 'moment/locale/fr';
import styles from './styles';

moment.locale('fr_FR');

type PropsType = {
  navigation: any,
  getUserMessages: ()=> void,
  messages: any,
};

type StateType = {
  currentTab: string,
};

export default class Courses extends React.Component<PropsType> {
  state: StateType;

  state = {
    currentTab: 'received',
  };

  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.setState({ currentTab: tabName });
  }

  render() {
    const { currentTab } = this.state;
    const { messages } = this.props;
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
          active={currentTab === 'sended'}
          onPress={() => this.switchTab('sended')}
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
        onWillFocus={() => this.props.getUserMessages()}
      >
        {messages.length === 0 && <Text style={styles.noMessage} note>{'Vous n\'avez pas de message'}</Text>}
        <List>
          {messages.map((message, index) => (
            <ListItem key={`message${index}`} avatar>
              <Left>
                <Thumbnail small source={{ uri: 'https://demo.ceusi.fr/main/img/unknown.jpg' }} />
              </Left>
              <Body>
                <Text>{message.sender.completeName}</Text>
                <Text note>{`${message.content.replace(/(<([^>]+)>)/ig, '').trim().substr(0, 30)}...`}</Text>
              </Body>
              <Right>
                <Text note>{moment(message.sendDate).fromNow()}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
