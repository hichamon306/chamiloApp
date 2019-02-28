import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

type PropsType = {
  navigation: any,
  authenticationData: any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class AuthLoading extends React.Component<PropsType> {
  constructor(props) {
    super(props);
    if (props.authenticationData) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
export default AuthLoading;
