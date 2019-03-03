import React from 'react';
import { H1 } from 'native-base';
import Page from '../../components/Page';

type PropsType = {
  navigation: any,
};

export default class Courses extends React.Component<PropsType> {
  render() {
    const footerProps = {
      navigation: this.props.navigation,
    };
    return (
      <Page footerProps={footerProps} headerProps>
        <H1>Bienvenue sur  Chamilo</H1>
      </Page>
    );
  }
}
