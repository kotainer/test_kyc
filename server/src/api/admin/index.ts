const Router = require('koa-router');
const router = new Router({ prefix: '/api/v1/admin' });
const convert = require('koa-convert');

import * as User from '../../models/user'
import { Users } from './users';

const users = new Users(User, 'user');

router
    // USERS
    .get('/users/requests', users.list)
    .get('/users/stats', users.userStat)

    .put('/users/requests/:id', users.update)
    // -----------------------------------------------

    ;

export default router;
