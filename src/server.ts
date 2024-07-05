import fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import 'dotenv/config';
import app from './app';

// ##################### SERVER SETUP: BEGIN #####################
const serverOptions = {} as https.ServerOptions;

const certificateFilePath = 'supposedCertificateFilePath';
const privateKeyFilePath = 'supposedPrivateKeyPath';

const serverPort = process.env.SERVER_PORT;

if (fs.existsSync(privateKeyFilePath) && fs.existsSync(certificateFilePath)) {
  serverOptions.key = fs.readFileSync(privateKeyFilePath, 'utf8');
  serverOptions.cert = fs.readFileSync(certificateFilePath, 'utf8');
  https.createServer(serverOptions, app).listen(serverPort, () => {
    console.log(`Server HTTPS started on port ${serverPort}!`);
  });
} else {
  http.createServer(serverOptions, app).listen(serverPort, () => {
    console.log(`Server HTTP started on port ${serverPort}!`);
  });
}
