import React from 'react';
import { WebView } from 'react-native-webview';
import { Linking, Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
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

  async openLink(url) {
    try {
      if (await InAppBrowser.isAvailable()) {
        // A delay to change the StatusBar when the browser is opened
        const animated = true;
        // const delay = animated && Platform.OS === 'ios' ? 400 : 0;
        // setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'close',
          // preferredBarTintColor: '#453AA4',
          // preferredControlTintColor: 'white',
          readerMode: false,
          animated,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'flipHorizontal',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          // toolbarColor: '#6200EE',
          // secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        // A delay to show an alert when the browser is closed
        await this.sleep(800);
        // Alert.alert('Response', JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      // Restore the previous StatusBar of the App
      // StatusBar.setBarStyle(statusBarStyle);
    }
  }

  sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  render() {
    const headerProps = {
      left: (
        <Button onPress={() => this.props.navigation.goBack()} transparent>
          <Icon name="arrow-back" />
        </Button>),
    };
    const { authenticationData, navigation } = this.props;
    const uri = navigation.getParam('uri', 'http://campus.ceusi.fr');
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
          // onNavigationStateChange={this.handleUrlChange.bind(this)}
          onShouldStartLoadWithRequest={(request) => {
            const { url } = request;
            // Only allow navigating within this website
            if (url.search('visioconference') !== -1) {
              // Linking.openURL(url);
              this.openLink(url);
              return false;
            }
            return true;
          }}
        />
      </Page>
    );
  }
}
