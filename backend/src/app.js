import express from 'express';
import http from 'http';
import cors from 'cors';
import './database';
import routes from './routes';
import {setupWebsocket} from './websocket';

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(express.json());
app.use(cors());

app.use(routes);

export default server;