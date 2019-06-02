
import { StyleSheet } from 'react-native';
import chamilo from '../../../native-base-theme/variables/chamilo';

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentLanguage: {
    alignSelf: 'center',
    marginRight: 10,
  },
  pickerText: {
    color: chamilo.defaultTextColor,
  },
  version: {
    textAlign: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
});
