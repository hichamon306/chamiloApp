// @flow
import { connect } from 'react-redux';
import CustomWebView from './CustomWebView.screen';
import { getAuthenticationData } from '../../modules/authentication';

const mapStateToProps = state => ({
  authenticationData: getAuthenticationData(state),
});

export default connect(mapStateToProps)(CustomWebView);
