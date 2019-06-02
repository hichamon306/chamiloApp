// @flow
import { connect } from 'react-redux';
import Home from './Home.screen';
import {
  getCountUnreadMessages,
  getUserMessagesReceivedActionCreator,
} from '../../modules/messages';
import {
  getSessionCount,
  getCourseCount,
  getUserCoursesActionCreator,
  getUserSessionsActionCreator,
} from '../../modules/courses';

const mapStateToProps = state => ({
  unreadMessagesCount: getCountUnreadMessages(state),
  sessionCount: getSessionCount(state),
  courseCount: getCourseCount(state),
});

const mapDispatchToProps = ({
  getUserCourses: getUserCoursesActionCreator,
  getUserSessions: getUserSessionsActionCreator,
  getUserMessagesReceived: getUserMessagesReceivedActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
