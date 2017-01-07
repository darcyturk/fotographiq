import axios from 'axios';
//import Config from 'react-native-config';

//import { apiHost } from './env';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

export default instance;
