// @flow
import { connect } from 'react-redux';
import Home from './Home.screen';
import { getUserProfile } from '../../modules/profile';

const mapStateToProps = state => ({
  userProfile: getUserProfile(state),
});

export default connect(mapStateToProps)(Home);
