
import { StyleSheet } from 'react-native';
import chamilo from '../../../native-base-theme/variables/chamilo';

export default StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  submit: {
    marginTop: 40,
  },
  rowContainer: {
    marginVertical: 10,
  },
  selectedItem: {
    color: '#FFF',
  },
  selectedItemContainer: {
    backgroundColor: chamilo.btnPrimaryBg,
    padding: 5,
  },
  selectorContainer: {
    borderColor: chamilo.cardBorderColor,
    borderWidth: chamilo.borderWidth,
    height: 'auto',
  },
  error: {
    color: chamilo.brandDanger,
    textAlign: 'right',
  },
  textArea: {
    flex: 1,
  },
  messageInput: {
    height: 180,
    textAlignVertical: 'top',
  },
});
