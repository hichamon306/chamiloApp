import React from 'react';
import {
  Item,
  Input,
  Button,
  Icon,
  Text,
} from 'native-base';
import { Image, View } from 'react-native';
import styles from './styles';
import background from '../../../assets/images/logo.png';
import Page from '../../components/Page';

type PropsType = {
  navigation: any,
  login: () => void,
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
      return (
        <Page>
          <View style={styles.container}>
            <Image resizeMode="contain" style={styles.logo} source={background} />
            <View style={styles.bg}>
              <Item>
                <Icon active name="person" />
                <Input
                  placeholder="Identifiant"
                  autoCapitalize="none"
                  value={this.state.username}
                  onChangeText={username => this.setState({ username })}
                />
              </Item>
              <Item>
                <Icon active name="unlock" />
                <Input
                  placeholder="Mot de passe"
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
                <Text>Connexion</Text>
              </Button>
              <Button
                transparent
                style={styles.btn}
              >
                <Text>Inscription</Text>
              </Button>
            </View>
          </View>
        </Page>
      );
    }
}
