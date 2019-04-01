// @flow
import { connect } from 'react-redux';
import Home from './Home.screen';
import { getCountUnreadMessages } from '../../modules/messages';
import { getSessionCount, getCourseCount } from '../../modules/courses';

const mapStateToProps = state => ({
  unreadMessagesCount: getCountUnreadMessages(state),
  sessionCount: getSessionCount(state),
  courseCount: getCourseCount(state),
});

export default connect(mapStateToProps)(Home);
