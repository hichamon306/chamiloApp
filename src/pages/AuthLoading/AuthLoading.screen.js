import React from 'react';
import { View, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

type PropsType = {
  navigation: any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class AuthLoading extends React.Component {
    constructor(props) {
      super(props);
      this.props.navigation.navigate('Login');
    }
    props: PropsType;
    
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
