// @flow
import { connect } from 'react-redux';
import Messages from './Messages.screen';
import { getMessageList, getUserMessagesActionCreator } from '../../modules/messages';

const mapStateToProps = state => ({
  messages: getMessageList(state),
});

const mapDispatchToProps = ({
  getUserMessages: getUserMessagesActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
