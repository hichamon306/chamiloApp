import React from 'react';
import {
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
  Toast,
} from 'native-base';
import moment from 'moment';
import { clone } from 'lodash';
import MultiSelect from '../../components/MultiSelect';
import chamilo from '../../../native-base-theme/variables/chamilo';
import Page from '../../components/Page';
import Text from '../../components/Text';
import styles from './styles';

type PropsType = {
  navigation: any,
  userList?: Array,
  getUsers: (search: string) => void,
  setUserList: () => void,
  sendMessage: () => void,
};

type StateType = {
  selectedUsers: Array,
  form: any,
  subject: string,
  message: string,
};

const defaultItemForm = { error: false, message: '' };

export default class NewMessage extends React.Component<PropsType> {
  static defaultProps = {
    userList: [],
  };

  constructor(props) {
    super(props);
    const receiver = props.navigation.getParam('receiver', null);
    const message = props.navigation.getParam('message', null);
    const userList = receiver ? [receiver] : [];
    props.setUserList(userList);
    this.state = {
      selectedUsers: receiver ? [receiver.id] : [],
      subject: message ? `Re: ${message.title}` : '',
      message: message
        // eslint-disable-next-line max-len
        ? `\n\n${receiver.name} - ${moment(message.sendDate).format('DD MMM YYYY à HH:mm ')} : ${message.content.replace(/(<([^>]+)>)/ig, '')} \n`
        : '',
      form: {
        users: clone(defaultItemForm),
        subject: clone(defaultItemForm),
        message: clone(defaultItemForm),
      },
    };
  }

  state: StateType;

  onSelectedItemsChange(selectedUsers) {
    this.setState({ selectedUsers });
  }

  onSearchTextChange(value: string) {
    const searchKey = value.trim();
    if (searchKey.length < 3) return;
    this.props.getUsers(searchKey);
  }

  getItems() {
    const items = [];
    this.props.userList.forEach((user) => {
      items.push({
        ...user,
        id: `${user.id}`,
      });
    });
    return items;
  }

  getSelectedUsers() {
    const users = [];
    const userList = this.getItems();
    this.state.selectedUsers.forEach((userId) => {
      const result = userList.filter(user => user.id === userId);
      if (result.length > 0) {
        users.push(result[0]);
      }
    });
    return users;
  }

  validateForm() {
    const { subject, message, selectedUsers, form } = this.state;
    if (selectedUsers.length === 0) {
      this.setState(
        {
          form: {
            ...form,
            users: {
              error: true,
              message: 'Ce champ est obligatoire',
            },
          },
        },
      );
      return false;
    }
    if (subject.trim().length === 0 || subject.trim().length < 3) {
      this.setState(
        {
          form: {
            ...form,
            subject: {
              error: true,
              message: 'Ce champ est obligatoire (3 caractères min.)',
            },
          },
        },
      );
      return false;
    }
    if (message.trim().length === 0 || message.trim().length < 10) {
      this.setState(
        {
          form: {
            ...form,
            message: {
              error: true,
              message: 'Ce champ est obligatoire (10 caractères min.)',
            },
          },
        },
      );
      return false;
    }
    this.setState({
      form: {
        users: clone(defaultItemForm),
        subject: clone(defaultItemForm),
        message: clone(defaultItemForm),
      },
    });
    return true;
  }

  onSubmit() {
    if (this.validateForm()) {
      const { subject, message, selectedUsers } = this.state;
      this.props.sendMessage({
        subject,
        message,
        users: selectedUsers,
      },
      () => {
        Toast.show({ text: 'Message envoyé !', type: 'success' });
        this.props.navigation.goBack();
      });
    }
  }

  render() {
    const headerProps = {
      left: (
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>),
    };
    const { selectedUsers, form } = this.state;
    return (
      <Page
        contentContainerStyle={styles.contentContainerStyle}
        headerProps={headerProps}
      >
        <MultiSelect
          hideTags={false}
          items={this.getItems()}
          uniqueKey="id"
          // ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={users => this.onSelectedItemsChange(users)}
          selectedItems={selectedUsers}
          selectText="Destinataires"
          searchInputPlaceholderText="Cherchez un utilisateur..."
          onChangeInput={text => this.onSearchTextChange(text)}
          altFontFamily={chamilo.fontFamily}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Choisir"
          styleSelectorContainer={styles.selectorContainer}
        />
        {form.users.error
          && (
            <Text note style={styles.error}>
              {form.users.message}
            </Text>
          )
        }
        <Form>
          <Item error={form.subject.error} stackedLabel>
            <Label>Objet</Label>
            <Input value={this.state.subject} onChangeText={value => this.setState({ subject: value })} />
          </Item>
          {form.subject.error
             && (
               <Text note style={styles.error}>
                 {form.subject.message}
               </Text>
             )
          }
          <Item error={form.message.error} stackedLabel last>
            <Label>Message</Label>
            <Input
              value={this.state.message}
              maxLength={4000}
              onChangeText={value => this.setState({ message: value })}
              multiline
              numberOfLines={20}
              style={styles.messageInput}
            />
          </Item>
          {form.message.error
             && (
               <Text note style={styles.error}>
                 {form.message.message}
               </Text>
             )
          }
        </Form>
        <Button onPress={() => this.onSubmit()} style={styles.submit} block>
          <Text>send</Text>
        </Button>
      </Page>
    );
  }
}
