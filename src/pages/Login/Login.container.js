// @flow
import { connect } from 'react-redux';
import Login from './Login.screen';
import { loginActionCreator } from '../../modules/authentication';

const mapDispatchToProps = ({
  login: loginActionCreator,
});
export default connect(null, mapDispatchToProps)(Login);
