import * as jwt from 'jsonwebtoken'; // аутентификация  по JWT для hhtp
const jwtsecret = 'LKlkaerKawfCashnprettygoodsecurekey'; // ключ для подписи JWT

import * as moment from 'moment';
import * as User from '../models/user';

const notAuthMethod = [
    '/api/clients/v1/auth/login',
];

const doubleUsedMethod = [];

const apiAttribute = '/api/';
const adminMethodAttribute = '/admin/';

const decodedToken = async (token) => {
    const decoded: any = await new Promise((resolve) => {
        jwt.verify(token.replace('JWT ', ''), jwtsecret, (err, info) => {
            if (info) {
                if (moment(info.expireAt) < moment()) {
                    return resolve(false);
                }
                return resolve(info);
            }
            return resolve(false);
        });
    });

    return decoded;
};

export default async (ctx, next) => {
    const url = ctx.request.url.split('?')[0];

    if (url.indexOf(apiAttribute) === -1) {
        return await next();
    }

    let isAdminMethod = false;
    let isNeedAuth = true;
    let doubleMethod = false;

    if (notAuthMethod.indexOf(url) > -1) {
        isNeedAuth = false;
    }

    if (url.indexOf(adminMethodAttribute) > -1) {
        isAdminMethod = true;
    }

    if (isNeedAuth) {
        const headerToken = ctx.headers.authorization;

        if (!headerToken) {
            throw {
                result: false,
                message: 'Пользователь неавторизирован',
                code: 401,
                status: 401
            };
        }

        const tokenInfo = await decodedToken(headerToken);

        if (!tokenInfo) {
            throw {
                result: false,
                message: 'Токен недействителен',
                code: 401,
                status: 401
            };
        }

        if (isAdminMethod && !tokenInfo.isAdmin) {
            throw {
                result: false,
                message: 'Недостаточно прав',
                code: 401,
                status: 401
            };
        }

        ctx.user = await User.findById(tokenInfo.id);
    }

    await next();
};
