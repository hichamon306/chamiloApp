// @flow
import { connect } from 'react-redux';
import MessageView from './MessageView.screen';
import {
  updateMessageStatusActionCreator,
  deleteUserMessageActionCreator,
} from '../../modules/messages';

const mapDispatchToProps = ({
  updateMessageStatus: updateMessageStatusActionCreator,
  deleteMessage: deleteUserMessageActionCreator,
});

export default connect(null, mapDispatchToProps)(MessageView);
