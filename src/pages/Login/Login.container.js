// @flow
import { connect } from 'react-redux';
import Login from './Login.screen';
import { loginActionCreator } from '../../modules/authentication';
import { getCurrentLanguage } from '../../modules/translation';

const mapDispatchToProps = ({
  login: loginActionCreator,
});

const mapStateToProps = state => ({
  currentLanguage: getCurrentLanguage(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
