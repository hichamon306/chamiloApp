// @flow
import { connect } from 'react-redux';
import Settings from './Settings.screen';
import { switchLanguageActionCreator, getCurrentLanguage } from '../../modules/translation';

const mapStateToProps = state => ({
  currentLanguage: getCurrentLanguage(state),
});

const mapDispatchToProps = ({
  switchLanguage: switchLanguageActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
