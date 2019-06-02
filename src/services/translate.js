// @flow
import I18n from 'react-native-i18n';
import numeral from 'numeral';
import { isNumber } from 'lodash';
import translations from '../translations';

I18n.fallbacks = true;
I18n.translations = translations;
numeral.locale('fr');

export default function translate(text: string, options: ?Object, language: ?string = 'fr') {
  return isNumber(text) ? numeral(text).format() : I18n.t(text, { locale: language, ...options });
}
