import React from 'react';
import {
    Footer,
    FooterTab,
    Button,
    Icon,
    Text,
    Badge,
} from 'native-base';

export default class CustomFooter extends React.Component {
    render() {
        return (
          <Footer>
            <FooterTab>
                <Button active vertical>
                <Icon name="home" />
                <Text style={{fontSize: 10}}>Accueil</Text>
                </Button>
                <Button badge vertical>
                <Badge ><Text>51</Text></Badge>
                <Icon active name="mail" />
                <Text style={{fontSize: 10}}>Messages</Text>
                </Button>
                <Button vertical>
                <Icon name="book" />
                <Text style={{fontSize: 10}}>Catalogue</Text>
                </Button>
                <Button vertical>
                <Icon name="person" />
                <Text style={{fontSize: 10}}>Contact</Text>
                </Button>
            </FooterTab>
        </Footer>
        );
    }
}
