/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import './src/Translation/I18n'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
