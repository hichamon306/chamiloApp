import React from 'react';
import { Alert, SafeAreaView } from 'react-native';
import {
  Thumbnail,
  List,
  ListItem,
  H2,
  Left,
  Right,
  Button,
  Icon,
  View,
  Body,
} from 'native-base';
import Page from '../../components/Page';
import { Text } from '../../components';
import styles from './styles';

type PropsType = {
  navigation: any,
  userProfile: any,
  logout: ()=> void,
  getUserProfil: ()=> void,
};

export default class Home extends React.Component<PropsType> {
  renderProfilExtra(item, index) {
    if (item.value === '') return null;
    return (
      <ListItem noIndent key={`extra_${index}`}>
        <Left>
          <Text skipTranslation style={styles.extraTitle}>{`${item.title}: `}</Text>
        </Left>
        <Right style={styles.extraValueContainer}>
          <Text skipTranslation note style={styles.extraValue}>{item.value}</Text>
        </Right>
      </ListItem>
    );
  }

  onLogout() {
    Alert.alert(
      'Information',
      'Attention vous êtes sur le point de vous déconnecter',
      [
        {
          text: 'Confirmer',
          onPress: () => this.props.logout(),
        },
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { userProfile, navigation } = this.props;
    const footerProps = {
      navigation,
    };
    return (
      <Page
        footerProps={footerProps}
        headerProps
        onDidFocus={() => this.props.getUserProfil()}
      >
        <SafeAreaView>
          <Button style={styles.closeButton} transparent onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="md-close" />
          </Button>
          {userProfile
            && (
              <View>
                <View style={styles.centredItems}>
                  <Thumbnail large source={{ uri: userProfile.pictureUri }} />
                  <H2>{userProfile.fullName}</H2>
                  <Text skipTranslation>{userProfile.username}</Text>
                  <Text skipTranslation>{userProfile.officialCode}</Text>
                </View>
                <List style={styles.extraContainer}>
                  {userProfile.extra.map((item, index) => (
                    this.renderProfilExtra(item, index)
                  ))}
                </List>
              </View>
            )
          }
          <ListItem last icon onPress={() => this.onLogout()}>
            <Left>
              <Button danger>
                <Icon active name="power" />
              </Button>
            </Left>
            <Body>
              <Text>logout</Text>
            </Body>
            <Right />
          </ListItem>
        </SafeAreaView>
      </Page>
    );
  }
}
