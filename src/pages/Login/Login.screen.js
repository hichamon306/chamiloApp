import React from 'react';
import {
  Item,
  Input,
  Button,
  Icon,
} from 'native-base';
import { Image, View } from 'react-native';
import styles from './styles';
import background from '../../../assets/images/logo.png';
import Page from '../../components/Page';
import { Text } from '../../components';
import translate from '../../services/translate';

type PropsType = {
  navigation: any,
  login: () => void,
  currentLanguage: string,
};

export default class Login extends React.Component<PropsType> {
    static navigationOptions = {
      header: null,
    };

    state = {
      username: '',
      password: '',
    };

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
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                />
              </Item>
              <Item>
                <Icon active name="unlock" />
                <Input
                  placeholder={translate('password', null, currentLanguage)}
                  value={this.state.password}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
              <Button
                style={styles.btn}
                onPress={() => this.props.login(this.state.username, this.state.password)}
              >
                <Text>login</Text>
              </Button>
              <Button
                transparent
                style={styles.btn}
              >
                <Text>signin</Text>
              </Button>
            </View>
          </View>
        </Page>
      );
    }
}
