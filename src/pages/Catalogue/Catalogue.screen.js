import React from 'react';
import { WebView } from 'react-native';
import Page from '../../components/Page';
import styles from './styles';

type PropsType = {
  navigation: any,
  authenticationData: any,
};

export default class Catalogue extends React.Component<PropsType> {
  render() {
    const { authenticationData } = this.props;
    const uri = `${authenticationData.url}main/auth/courses.php`;
    const injectedJS = `
      document.getElementById('cm-header').style.display = "none";
      document.getElementsByTagName('footer')[0].style.display = "none";
      var alerts = document.getElementsByClassName('alert');
      if(alerts.length > 0) alerts[0].style.display = "none";
      document.getElementById('formLogin').style.display = "none";
      document.getElementById('formLogin_login').value='${authenticationData.username}';
      document.getElementById('formLogin_password').value='${authenticationData.password}';
      document.getElementById('formLogin_submitAuth').click();
    `;
    return (
      <Page
        contentContainerStyle={styles.contentContainerStyle}
        headerProps
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
