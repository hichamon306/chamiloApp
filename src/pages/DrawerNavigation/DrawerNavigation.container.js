// @flow
import { connect } from 'react-redux';
import DrawerNavigation from './DrawerNavigation.screen';
import { getUserProfile } from '../../modules/profile';
import { logoutActionCreator } from '../../modules/authentication';

const mapStateToProps = state => ({
  userProfile: getUserProfile(state),
});

const mapDispatchToProps = ({
  logout: logoutActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigation);
