
import { StyleSheet } from 'react-native';
import chamilo from '../../../native-base-theme/variables/chamilo';

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  accordionIcon: {
    fontSize: 20,
  },
  accordionTitle: {
    color: chamilo.brandPrimary,
    fontSize: chamilo.fontSizeBase,
    fontWeight: 'bold',
  },
  separator: {
    height: 'auto',
  },
});
