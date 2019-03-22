// @flow
import { connect } from 'react-redux';
import MessageView from './MessageView.screen';
import { updateMessageStatusActionCreator } from '../../modules/messages';

const mapDispatchToProps = ({
  updateMessageStatus: updateMessageStatusActionCreator,
});

export default connect(null, mapDispatchToProps)(MessageView);
