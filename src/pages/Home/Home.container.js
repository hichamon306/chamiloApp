// @flow
import { connect } from 'react-redux';
import Home from './Home.screen';
import { getCountUnreadMessages } from '../../modules/messages';
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
