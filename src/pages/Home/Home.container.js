// @flow
import { connect } from 'react-redux';
import Home from './Home.screen';
import { getUserProfile, getUserProfileActionCreator } from '../../modules/profile';

const mapStateToProps = state => ({
  userProfile: getUserProfile(state),
});

const mapDispatchToProps = ({
  getUserProfil: getUserProfileActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
