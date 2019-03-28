import React from 'react';
import {
  Text,
} from 'native-base';
import Page from '../../components/Page';

type PropsType = {
  navigation: any,
};

export default class Settings extends React.Component<PropsType> {
  render() {
    return (
      <Page>
        <Text>Settings</Text>
      </Page>
    );
  }
}
