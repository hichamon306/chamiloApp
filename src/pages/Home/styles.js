
import { StyleSheet } from 'react-native';
import chamilo from '../../../native-base-theme/variables/chamilo';

export default StyleSheet.create({
  cardItem: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 3.5,
    justifyContent: 'center',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  page: {
    backgroundColor: '#F0EFF5',
  },
  value: {
    fontSize: chamilo.fontSizeH1 * 3,
    fontWeight: 'bold',
    lineHeight: chamilo.fontSizeH1 * 3,
    color: chamilo.brandPrimary,
  },
  label: {
    lineHeight: chamilo.fontSizeH1 * 3,
    marginLeft: 10,
    color: chamilo.brandPrimary,
  },
});
