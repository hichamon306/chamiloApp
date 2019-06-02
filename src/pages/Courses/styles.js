
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
    color: chamilo.tabBarTextColor,
  },
  accordionTitle: {
    color: chamilo.brandPrimary,
    fontSize: chamilo.fontSizeBase,
    fontWeight: 'bold',
    flex: 0.95,
  },
  separator: {
    height: 'auto',
    backgroundColor: '#FFF',
    borderWidth: 0,
  },
  segment: {
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  accordion: {
    borderWidth: 0,
  },
});
