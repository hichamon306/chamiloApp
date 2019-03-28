// @flow
import { connect } from 'react-redux';
import DrawerNavigation from './DrawerNavigation.screen';
import { getUserProfile, getUserProfileActionCreator } from '../../modules/profile';
import { logoutActionCreator } from '../../modules/authentication';

const mapStateToProps = state => ({
  userProfile: getUserProfile(state),
});

const mapDispatchToProps = ({
  getUserProfil: getUserProfileActionCreator,
  logout: logoutActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigation);
