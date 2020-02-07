// @flow
import { connect } from 'react-redux';
import AuthLoading from './AuthLoading.screen';
import { getAuthenticationData, registerDeviceTokenActionCreator } from '../../modules/authentication';
import { loadDataActionCreator } from '../../modules/dataLoader';

const mapStateToProps = state => ({
  authenticationData: getAuthenticationData(state),
});

const mapDispatchToProps = ({
  registerDeviceToken: registerDeviceTokenActionCreator,
  loadData: loadDataActionCreator,
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
