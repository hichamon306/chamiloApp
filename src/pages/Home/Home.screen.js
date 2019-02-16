import React from 'react';
import { View } from 'react-native';
import { Container, Drawer, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

export default class Home extends React.Component {
    render() {
        closeDrawer = () => {
            this.drawer._root.close()
          };
          openDrawer = () => {
            this.drawer._root.open()
          };
        return (
            <Container>
                <Content>
                    <Button full danger onPress={() => this.props.navigation.navigate('Login')}>
                        <Text>déconnexion</Text>
                    </Button>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button active vertical>
                        <Icon name="home" />
                        <Text style={{fontSize: 12}}>Accueil</Text>
                        </Button>
                        <Button badge vertical>
                        <Badge ><Text>51</Text></Badge>
                        <Icon active name="mail" />
                        <Text style={{fontSize: 12}}>Messages</Text>
                        </Button>
                        <Button vertical>
                        <Icon name="book" />
                        <Text style={{fontSize: 12}}>Catalogue</Text>
                        </Button>
                        <Button vertical>
                        <Icon name="person" />
                        <Text style={{fontSize: 12}}>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}   