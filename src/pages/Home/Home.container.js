// @flow
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import Home from './Home.screen';
import {
  getCountUnreadMessages,
} from '../../modules/messages';
import {
  getSessionCount,
  getCourseCount,
} from '../../modules/courses';

const mapStateToProps = state => ({
  unreadMessagesCount: getCountUnreadMessages(state),
  sessionCount: getSessionCount(state),
  courseCount: getCourseCount(state),
});

/*
const mapDispatchToProps = ({
  getUserCourses: getUserCoursesActionCreator,
  getUserSessions: getUserSessionsActionCreator,
  getUserMessagesReceived: getUserMessagesReceivedActionCreator,
});
*/

export default connect(mapStateToProps)(withNavigationFocus(Home));
