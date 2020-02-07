// @flow
import { connect } from 'react-redux';
import MessagesSent from './MessagesSent.screen';
import {
  getMessagesSentList,
} from '../../modules/messages';

const mapStateToProps = state => ({
  messagesSent: getMessagesSentList(state),
});


export default connect(mapStateToProps)(MessagesSent);
