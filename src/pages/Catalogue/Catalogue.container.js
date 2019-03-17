// @flow
import { connect } from 'react-redux';
import Catalogue from './Catalogue.screen';
import { getAuthenticationData } from '../../modules/authentication';

const mapStateToProps = state => ({
  authenticationData: getAuthenticationData(state),
});

export default connect(mapStateToProps)(Catalogue);
