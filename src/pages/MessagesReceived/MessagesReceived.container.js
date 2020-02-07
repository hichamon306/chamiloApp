// @flow
import { connect } from 'react-redux';
import MessagesReceived from './MessagesReceived.screen';
import {
  getMessagesReceivedList,
  updateMessageStatusActionCreator,
  getCurrentPage,
  setCurrentPageActionCreator,
} from '../../modules/messages';

const mapDispatchToProps = ({
  updateMessageStatus: updateMessageStatusActionCreator,
  setCurrentPage: setCurrentPageActionCreator,
});

const mapStateToProps = state => ({
  messagesReceived: getMessagesReceivedList(state),
  currentPage: getCurrentPage(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesReceived);
