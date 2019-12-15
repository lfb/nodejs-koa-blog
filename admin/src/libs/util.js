import axios from 'axios';

let util = {};

util.title = function (title) {
  title = title ? title + ' - boblog.com ' : 'boblog.com 后台';
  window.document.title = title;
};

const ajaxUrl = process.env.NODE_ENV === 'development' ?
  'http://localhost:3000/api/v1' :
  'https://www.boblog.com/api/v1';

util.ajax_url = ajaxUrl;

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

export default util;
