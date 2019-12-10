/** @format */

import { AppRegistry } from 'react-native';
import Store from './src/Store';
import { name as appName } from './src/app.json';

AppRegistry.registerComponent(appName, () => Store);
