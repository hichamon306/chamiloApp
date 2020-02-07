// @flow
import { connect } from 'react-redux';
import Login from './Login.screen';
import { loginActionCreator, getUserName, getPassword, getRememberMe } from '../../modules/authentication';
import { getCurrentLanguage } from '../../modules/translation';

const mapDispatchToProps = ({
  login: loginActionCreator,
});

const mapStateToProps = state => ({
  currentLanguage: getCurrentLanguage(state),
  username: getUserName(state),
  password: getPassword(state),
  rememberMe: getRememberMe(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
