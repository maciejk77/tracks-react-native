import axios from 'axios';

export default axios.create({
  // baseURL to be changed every 8h session
  // try in command line => ngrok http 3000
  // copy and paste url below
  baseURL: 'http://5b9ff7de.ngrok.io'
});
