// @flow
import { connect } from 'react-redux';
import Messages from './Messages.screen';
import {
  getMessagesReceivedList,
  getMessagesSentList,
  getUserMessagesReceivedActionCreator,
  getUserMessagesSentActionCreator,
} from '../../modules/messages';

const mapStateToProps = state => ({
  messagesReceived: getMessagesReceivedList(state),
  messagesSent: getMessagesSentList(state),
});

const mapDispatchToProps = ({
  getUserMessagesReceived: getUserMessagesReceivedActionCreator,
  getUserMessagesSent: getUserMessagesSentActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
