// @flow
import { connect } from 'react-redux';
import Courses from './Courses.screen';
import {
  getSessionList,
  getCourseList,
} from '../../modules/courses';
import { getAuthenticationData } from '../../modules/authentication';

const mapStateToProps = state => ({
  sessionList: getSessionList(state),
  courseList: getCourseList(state),
  authenticationData: getAuthenticationData(state),
});

export default connect(mapStateToProps)(Courses);
