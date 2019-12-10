import React from 'react';
import { WebView } from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';
import Page from '../../components/Page';
import styles from './styles';

type PropsType = {
  navigation: any,
  authenticationData: any,
};

export default class CustomWebView extends React.Component<PropsType> {
  render() {
    const headerProps = {
      left: (
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>),
    };
    const { authenticationData, navigation } = this.props;
    const uri = navigation.getParam('uri', 'http://demo.ceusi.fr');
    const injectedJS = `
      document.getElementById('cm-header').style.display = "none";
      document.getElementsByTagName('footer')[0].style.display = "none";
      var alerts = document.getElementsByClassName('alert');
      if(alerts.length > 0) alerts[0].style.display = "none";
      document.getElementById('formLogin').style.display = "none";
      document.getElementById('formLogin_login').value='${authenticationData.username || ''}';
      document.getElementById('formLogin_password').value='${authenticationData.password || ''}';
      document.getElementById('formLogin_submitAuth').click();
    `;
    return (
      <Page
        contentContainerStyle={styles.contentContainerStyle}
        headerProps={headerProps}
      >
        <WebView
          injectedJavaScript={injectedJS}
          source={{ uri }}
          startInLoadingState
        />
      </Page>
    );
  }
}
