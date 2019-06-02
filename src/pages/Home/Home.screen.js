import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Card, CardItem, Thumbnail, H1, Row,
} from 'native-base';
import Page from '../../components/Page';
import sessionImage from '../../../assets/images/session.png';
import courseImage from '../../../assets/images/course.png';
import catalogImage from '../../../assets/images/catalog.png';
import messageImage from '../../../assets/images/message.png';
import styles from './styles';
import { Text } from '../../components';

type PropsType = {
  navigation: any,
  sessionCount: number,
  courseCount: number,
  unreadMessagesCount: number,
  getUserCourses: () => void,
  getUserSessions: () => void,
  getUserMessagesReceived: () => void,
};

export default class Home extends React.Component<PropsType> {
  navigateTo(routeName: string, params: any) {
    this.props.navigation.navigate(routeName, params);
  }

  loadData() {
    this.props.getUserCourses();
    this.props.getUserSessions();
    this.props.getUserMessagesReceived();
  }

  render() {
    const { unreadMessagesCount, courseCount, sessionCount } = this.props;
    return (
      <Page
        onWillFocus={() => this.loadData()}
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.page}
      >
        <Card style={styles.card}>
          <TouchableOpacity
            onPress={() => this.navigateTo('Courses', { currentTab: 'sessions' })}
          >
            <CardItem
              style={styles.cardItem}
            >
              <Row>
                <H1 style={styles.value}>{sessionCount}</H1>
                <Text style={styles.label} note>
                  {sessionCount > 1 ? 'sessions' : 'session'}
                </Text>
              </Row>
              <Thumbnail large square style={styles.sessionImage} source={sessionImage} />
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => this.navigateTo('Courses', { currentTab: 'courses' })}>
            <CardItem style={styles.cardItem}>
              <Row>
                <H1 style={styles.value}>{courseCount}</H1>
                <Text style={styles.label} note>
                  courses
                </Text>
              </Row>
              <Thumbnail large square style={styles.sessionImage} source={courseImage} />
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => this.navigateTo('Messages')}>
            <CardItem style={styles.cardItem}>
              <Row>
                <H1 style={styles.value}>{unreadMessagesCount}</H1>
                <Text style={styles.label} note>
                  {unreadMessagesCount > 1 ? 'newMessages' : 'newMessage' }
                </Text>
              </Row>
              <Thumbnail large square style={styles.sessionImage} source={messageImage} />
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Card style={styles.card}>
          <TouchableOpacity onPress={() => this.navigateTo('Catalogue')}>
            <CardItem style={styles.cardItem}>
              <Text style={styles.label} not>courseCatalog</Text>
              <Thumbnail large square style={styles.sessionImage} source={catalogImage} />
            </CardItem>
          </TouchableOpacity>
        </Card>
      </Page>
    );
  }
}
