import React from 'react';
import {
    Container,
    Content,
    Item,
    Input,
    Button,
    Icon,
    View,
    Text
  } from "native-base";
  import { ImageBackground } from "react-native";
  import styles from "./styles";
  import background from '../../../assets/images/logo.png';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <Container>
                <View style={styles.container}>
                <Content>
                    <ImageBackground resizeMode="contain" source={background} style={styles.shadow}>
                    <View style={styles.bg}>
                        <Item>
                            <Icon active name="person" />
                            <Input
                                placeholder= "EMAIL"
                            />
                        </Item>
                        <Item>
                            <Icon active name="unlock" />
                            <Input
                                placeholder= "mot de passe"
                            />
                        </Item>
                        <Button
                            style={styles.btn}
                            onPress={() => this.props.navigation.navigate("Home")}
                        >
                        <Text>Connexion</Text>
                        </Button>
                        <Button
                            transparent
                            style={styles.btn}
                            onPress={() => this.props.navigation.navigate("Home")}
                        >
                            <Text>Inscription</Text>
                        </Button>
                    </View>
                    </ImageBackground>
                </Content>
                </View>
            </Container>
        );
    }
}
