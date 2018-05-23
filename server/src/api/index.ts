const Router = require('koa-router');

import clientRouter from './client';
import adminRouter from './admin';


const clientAllRouter = new Router();
clientAllRouter
    .get('/*', );


const combineRouters = require('koa-combine-routers');
const router = combineRouters([
    clientRouter,
    adminRouter,
    clientAllRouter
]);

export default router;
