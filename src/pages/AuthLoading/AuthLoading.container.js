// @flow
import { connect } from 'react-redux';
import AuthLoading from './AuthLoading.screen';
import { getAuthenticationData, registerDeviceTokenActionCreator } from '../../modules/authentication';
import { getUserMessagesReceivedActionCreator } from '../../modules/messages';
import { getUserCoursesActionCreator, getUserSessionsActionCreator } from '../../modules/courses';

const mapStateToProps = state => ({
  authenticationData: getAuthenticationData(state),
});

const mapDispatchToProps = ({
  registerDeviceToken: registerDeviceTokenActionCreator,
  getUserMessagesReceived: getUserMessagesReceivedActionCreator,
  getUserCourses: getUserCoursesActionCreator,
  getUserSessions: getUserSessionsActionCreator,
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
