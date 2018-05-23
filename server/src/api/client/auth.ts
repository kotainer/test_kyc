import * as User from '../../models/user';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import passport from '../../middleware/userAuthStategy';

const jwtsecret = 'LKlkaerKawfCashnprettygoodsecurekey';

export class Auth {
    login = async (ctx) => {
        await passport.authenticate('local', function (err, user) {
            if (!user) {
                throw {
                    message: 'Неверный логин или пароль',
                    code: 401
                };

            } else {
                const payload = {
                    id: user._id,
                    isAdmin: user.isAdmin,
                    expireAt: moment().add(50, 'minutes'),
                };
                const token = jwt.sign(payload, jwtsecret);

                ctx.body = {
                    result: true,
                    data: {
                        token: 'JWT ' + token,
                        user: {
                            _id: user._id,
                            login: user.login,
                            isAdmin: user.isAdmin,
                            isVerify: user.isVerify
                        }
                    }
                };
            }

        })(ctx);

    }
};
