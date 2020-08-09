import React from 'react';
import {
  Item,
  Input,
  Button,
  Icon,
  CheckBox,
} from 'native-base';
import { Image, View } from 'react-native';
import styles from './styles';
import background from '../../../assets/logo.png';
import Page from '../../components/Page';
import { Text } from '../../components';
import translate from '../../services/translate';
import { SIGNIN_URL } from '../../config/constants';

type PropsType = {
  navigation: any,
  login: () => void,
  currentLanguage: string,
  rememberMe: Boolean,
  username: String,
  password: String,
};

export default class Login extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  static navigationOptions = {
    header: null,
  };

  toggleCheckbox() {
    const { rememberMe } = this.state;
    this.setState({
      rememberMe: !rememberMe,
    });
  }

  submitForm() {
    this.props.login(this.state.username, this.state.password, this.state.rememberMe);
  }

  render() {
    const { currentLanguage } = this.props;
    return (
      <Page contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <Image resizeMode="contain" style={styles.logo} source={background} />
          <View style={styles.bg}>
            <Item>
              <Icon active name="person" />
              <Input
                placeholder={translate('username', null, currentLanguage)}
                autoCapitalize="none"
                returnKeyType="next"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                onSubmitEditing={() => { this.passwordInput._root.focus(); }}
                blurOnSubmit={false}
              />
            </Item>
            <Item>
              <Icon active name="unlock" />
              <Input
                ref={(input) => { this.passwordInput = input; }}
                placeholder={translate('password', null, currentLanguage)}
                value={this.state.password}
                secureTextEntry
                returnKeyType="done"
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                onSubmitEditing={() => this.submitForm()}
              />
            </Item>
            <View style={styles.rememberMeContainer}>
              <CheckBox
                style={styles.checkbox}
                checked={this.state.rememberMe}
                onPress={() => this.toggleCheckbox()}
              />
              <Text>rememberMe</Text>
            </View>
            <Button
              style={styles.btn}
              onPress={() => this.submitForm()}
            >
              <Text>login</Text>
            </Button>
            <Button
              transparent
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('Webview', { uri: SIGNIN_URL })}
            >
              <Text>signin</Text>
            </Button>
          </View>
        </View>
      </Page>
    );
  }
}
