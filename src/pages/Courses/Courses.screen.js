import React from 'react';
import {
  View,
} from 'react-native';
import {
  Button,
  Segment,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Accordion,
  Card,
} from 'native-base';
import Page from '../../components/Page';
import styles from './styles';
import courseImage from '../../../assets/images/course.png';
import { Text } from '../../components';

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
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'courses',
    };
  }

  state: StateType;

  switchTab(tabName: string) {
    const { currentTab } = this.state;
    if (currentTab === tabName) return;
    this.setState({ currentTab: tabName });
  }

  _renderHeader(item, expanded) {
    return (
      <Card>
        <View style={styles.rowContainer}>
          <Text skipTranslation style={styles.accordionTitle}>{item.name}</Text>
          <Icon style={styles.accordionIcon} name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'} />
        </View>
      </Card>
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
        {tabItems.map((course, index) => {
          const imageURI = course.pictureUrl || course.urlPicture;
          return (
            <ListItem
              key={index}
              Thumbnail
              onPress={() => this.navigateToCourse(course, idSession)}
            >
              <Left style={{ flex: 0 }}>
                <Thumbnail large square source={imageURI ? { uri: imageURI } : courseImage} />
              </Left>
              <Body>
                <Text skipTranslation>{course.title}</Text>
                <Text skipTranslation note>{course.code}</Text>
              </Body>
              <Right>
                <Icon name="add" />
              </Right>
            </ListItem>
          );
        })}
      </List>
    );
  }

  onDidFocus() {
    this.props.getUserCourses();
    this.props.getUserSessions();
    this.setState({
      currentTab: this.props.navigation.getParam('currentTab', 'courses'),
    });
  }

  render() {
    const { currentTab } = this.state;
    const { courseList, sessionList } = this.props;
    const segment = (
      <Segment style={styles.segment}>
        <Button
          first
          active={currentTab === 'courses'}
          onPress={() => this.switchTab('courses')}
        >
          <Text>myCourses</Text>
        </Button>
        <Button
          last
          active={currentTab === 'sessions'}
          onPress={() => this.switchTab('sessions')}
        >
          <Text>mySessions</Text>
        </Button>
      </Segment>
    );
    return (
      <Page
        onDidFocus={() => this.onDidFocus()}
        postHeader={segment}
      >
        {currentTab === 'sessions'
          &&
          (
            <Accordion
              dataArray={sessionList}
              animation={true}
              style={styles.accordion}
              renderHeader={this._renderHeader}
              renderContent={item => this._renderContent(item)}
            />
          )
        }
        {currentTab === 'courses'
          && this._renderContent(courseList)
        }
      </Page>
    );
  }
}
