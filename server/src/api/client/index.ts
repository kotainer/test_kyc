const Router = require('koa-router');
const router = new Router({ prefix: '/api/v1' });
const convert = require('koa-convert');

import { Auth } from './auth';
import { Users } from './users';

const auth = new Auth();
const users = new Users();

router
    // AUTH
    .post('/auth/login', auth.login)
    // -----------------------------------------------

    // USERS
    .get('/user', users.getMy)

    .post('/user/photo', users.uploadPhoto)

    .put('/user', users.update)
    // -----------------------------------------------

    ;

export default router;
