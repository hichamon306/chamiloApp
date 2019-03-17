// @flow
import { connect } from 'react-redux';
import Courses from './Courses.screen';
import {
  getSessionList,
  getCourseList,
  getUserCoursesActionCreator,
  getUserSessionsActionCreator,
} from '../../modules/courses';
import { getAuthenticationData } from '../../modules/authentication';

const mapStateToProps = state => ({
  sessionList: getSessionList(state),
  courseList: getCourseList(state),
  authenticationData: getAuthenticationData(state),
});

const mapDispatchToProps = ({
  getUserCourses: getUserCoursesActionCreator,
  getUserSessions: getUserSessionsActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
