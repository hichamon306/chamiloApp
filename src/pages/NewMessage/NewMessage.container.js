// @flow
import { connect } from 'react-redux';
import NewMessage from './NewMessage.screen';
import {
  getUsersActionCreator,
  getUserList,
  sendMessageActionCreator,
  setUserListActionCreator,
} from '../../modules/messages';

const mapStateToProps = state => ({
  userList: getUserList(state),
});

const mapDispatchToProps = ({
  getUsers: getUsersActionCreator,
  sendMessage: sendMessageActionCreator,
  setUserList: setUserListActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
