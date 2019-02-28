// @flow
import { connect } from 'react-redux';
import Home from './Home.screen';
import { logoutActionCreator } from '../../modules/authentication';

const mapDispatchToProps = ({
  logout: logoutActionCreator,
});
export default connect(null, mapDispatchToProps)(Home);
