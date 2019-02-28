// @flow
import { connect } from 'react-redux';
import AuthLoading from './AuthLoading.screen';
import { getAuthenticationData } from '../../modules/authentication';

const mapStateToProps = state => ({
  authenticationData: getAuthenticationData(state),
});


export default connect(mapStateToProps)(AuthLoading);
