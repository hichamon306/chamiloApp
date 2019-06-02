// @flow
import { connect } from 'react-redux';
import MessageView from './MessageView.screen';
import {
  updateMessageStatusActionCreator,
  deleteUserMessageActionCreator,
} from '../../modules/messages';
import { getCurrentLanguage } from '../../modules/translation';

const mapDispatchToProps = ({
  updateMessageStatus: updateMessageStatusActionCreator,
  deleteMessage: deleteUserMessageActionCreator,
});

const mapStateToProps = state => ({
  currentLanguage: getCurrentLanguage(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageView);
