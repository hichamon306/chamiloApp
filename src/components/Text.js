// @flow
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { Text, connectStyle } from 'native-base';
import numeral from 'numeral';
import 'numeral/locales/fr';
import React from 'react';
import { getCurrentLanguage } from '../modules/translation';
import translations from '../translations';
import translate from '../services/translate';


I18n.fallbacks = true;
I18n.translations = translations;
numeral.locale();

type PropsType = {
  text: string,
  language: string,
  options: Object,
  children: any,
  skipTranslation: boolean,
};

class CustomText extends React.Component<PropsType> {
  props: PropsType;

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { skipTranslation, children } = this.props;
    const translatedText = skipTranslation ?
      children
      : translate(this.props.children, this.props.options, this.props.language);
    return (
      <Text ref={(c) => { this._root = c; }} {...this.props}>
        {translatedText}
      </Text>
    );
  }
}

const mapStateToProps = state => ({
  language: getCurrentLanguage(state),
});

const connectedText = connect(mapStateToProps, null)(CustomText);

export default connectStyle('NativeBase.Text', {})(connectedText);
