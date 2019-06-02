
import { StyleSheet } from 'react-native';
import chamilo from '../../../native-base-theme/variables/chamilo';

export default StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  rowContainer: {
    borderTopColor: '#c9c9c9',
    borderTopWidth: 0.33,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  htmlView: {
    marginVertical: 30,
    minHeight: 70,
  },
  user: {
    fontSize: chamilo.fontSizeH1,
  },
});
