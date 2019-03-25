import React from 'react';
import {
  Button,
  Segment,
  Text,
  Separator,
  Icon,
  View,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  H2,
} from 'native-base';
import Page from '../../components/Page';
import styles from './styles';

type PropsType = {
  navigation: any,
  courseList: any,
  sessionList: any,
  authenticationData: any,
  getUserCourses: ()=> void,
  getUserSessions: ()=> void,
};

type StateType = {
  currentTab: string,
};

export default class Courses extends React.Component<PropsType> {
  state: StateType;

  state = {
    currentTab: 'courses',
  };

  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.setState({ currentTab: tabName });
  }

  _renderHeader(item, expanded) {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.accordionTitle}>{item.name}</Text>
        <Icon style={styles.accordionIcon} name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'} />
      </View>
    );
  }

  navigateToCourse(course: any, idSession: number) {
    const { navigation, authenticationData } = this.props;
    const uri = `${authenticationData.url}courses/${course.directory}/index.php?id_session=${idSession}`;
    navigation.navigate('WebView', { uri });
  }

  _renderContent(item) {
    let tabItems = [];
    let idSession = 0;
    if (Array.isArray(item)) {
      tabItems = item;
    } else {
      tabItems = item.courses;
      idSession = item.id;
    }
    return (
      <List>
        {tabItems.map((course, index) => (
          <ListItem
            key={index}
            Thumbnail
            onPress={() => this.navigateToCourse(course, idSession)}
          >
            <Left style={{ flex: 0 }}>
              <Thumbnail large square source={{ uri: course.pictureUrl || course.urlPicture }} />
            </Left>
            <Body>
              <Text>{course.title}</Text>
              <Text note>{course.code}</Text>
            </Body>
            <Right>
              <Icon name="add" />
            </Right>
          </ListItem>
        ))}
      </List>
    );
  }

  onWillFocus() {
    this.props.getUserCourses();
    this.props.getUserSessions();
  }

  render() {
    const { currentTab } = this.state;
    const { courseList, sessionList } = this.props;
    const footerProps = {
      navigation: this.props.navigation,
    };
    const headerProps = {
      hasSegment: true,
    };
    const postHeader = (
      <Segment>
        <Button
          first
          active={currentTab === 'courses'}
          onPress={() => this.switchTab('courses')}
        >
          <Text>Cours</Text>
        </Button>
        <Button
          last
          active={currentTab === 'sessions'}
          onPress={() => this.switchTab('sessions')}
        >
          <Text>Session</Text>
        </Button>
      </Segment>
    );
    return (
      <Page
        padder={false}
        postHeader={postHeader}
        footerProps={footerProps}
        headerProps={headerProps}
        onWillFocus={() => this.onWillFocus()}
      >
        {currentTab === 'sessions'
          && (
            <View>
              {sessionList.map(session => (
                <View key={`session${session.id}`}>
                  <Separator style={styles.separator} bordered>
                    <H2 style={styles.accordionTitle}>{session.name}</H2>
                  </Separator>
                  {this._renderContent(session.courses)}
                </View>
              ))
              }
            </View>
          )
        }
        {currentTab === 'courses'
          && this._renderContent(courseList)
        }
      </Page>
    );
  }
}
