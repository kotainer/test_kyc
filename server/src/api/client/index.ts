const Router = require('koa-router');
const router = new Router({ prefix: '/api/clients/v1' });
const convert = require('koa-convert');

import { Auth } from './auth';



const auth = new Auth();
// const users = new Users(UserModel, 'user');

router
    // AUTH
    .post('/auth/login', auth.login)
    // -----------------------------------------------

    ;

export default router;
