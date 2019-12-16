import React from 'react';
import { WebView } from 'react-native-webview';
import Page from '../../components/Page';
import styles from './styles';

type PropsType = {
  navigation: any,
  authenticationData: any,
};

type StateType = {
  uri: string,
};

export default class Catalogue extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    this.state = {
      uri: `${props.authenticationData.url}main/auth/courses.php`,
    };
  }

  state: StateType;

  reload() {
    const uri = `${this.props.authenticationData.url}main/auth/courses.php`;
    this.setState({ uri });
  }

  render() {
    const { authenticationData } = this.props;
    const injectedJS = `
      document.getElementById('cm-header').style.display = "none";
      document.getElementsByTagName('footer')[0].style.display = "none";
      var alerts = document.getElementsByClassName('alert-danger');
      if(alerts.length > 0) alerts[0].style.display = "none";
      if(document.getElementById('formLogin')){
        document.getElementById('formLogin').style.display = "none";
        document.getElementById('formLogin_login').value='${authenticationData.username}';
        document.getElementById('formLogin_password').value='${authenticationData.password}';
        document.getElementById('formLogin_submitAuth').click();
      }
      
    `;
    return (
      <Page
        contentContainerStyle={styles.contentContainerStyle}
        headerProps
        onDidFocus={() => this.reload()}
      >
        <WebView
          injectedJavaScript={injectedJS}
          source={{ uri: this.state.uri }}
          startInLoadingState
        />
      </Page>
    );
  }
}
