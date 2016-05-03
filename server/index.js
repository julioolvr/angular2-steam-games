require('dotenv').config();

const http = require('http');
const got = require('got');

const BASE_PATH = 'api.steampowered.com';

http.createServer((req, res) => {
  var headers = req.headers;
  headers.host = BASE_PATH;

  var req = got.stream({
    host: BASE_PATH,
    path: req.url + '&key=' + process.env.STEAM_KEY,
    headers: headers
  });

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  req.on('error', e => console.log('Error making request to Steam', e));
  req.pipe(res);
}).listen(process.env.SERVER_PORT);
