import React from 'react';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
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
  handleUrlChange(webviewState) {
    const { url } = webviewState;
    if (url.search('visioconference') !== -1) {
      Linking.openURL(url);
    }
  }

  render() {
    const headerProps = {
      left: (
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>),
    };
    const { authenticationData, navigation } = this.props;
    const uri = navigation.getParam('uri', 'http://demo.ceusi.fr');
    let injectedJS = `
      document.getElementById('cm-header').style.display = "none";
      document.getElementsByTagName('footer')[0].style.display = "none";
    `;
    if (authenticationData) {
      injectedJS += `
      try {
        var alerts = document.getElementsByClassName('alert');
        if(alerts.length > 0) alerts[0].style.display = "none";
        var form = document.getElementById('formLogin');
        if(form.length > 0){
          document.getElementById('formLogin').style.display = "none";
          document.getElementById('formLogin_login').value='${authenticationData.username || ''}';
          document.getElementById('formLogin_password').value='${authenticationData.password || ''}';
          document.getElementById('formLogin_submitAuth').click();
        }
      } catch(e) {

      }
    `;
    }

    return (
      <Page
        contentContainerStyle={styles.contentContainerStyle}
        headerProps={headerProps}
      >
        <WebView
          allowsInlineMediaPlayback
          injectedJavaScript={injectedJS}
          source={{ uri }}
          // eslint-disable-next-line react/jsx-no-bind
          onNavigationStateChange={this.handleUrlChange.bind(this)}
        />
      </Page>
    );
  }
}
