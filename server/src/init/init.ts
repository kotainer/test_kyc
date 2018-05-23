const mongoose = require('mongoose');
const config = require('config');
const uuid = require('uuid');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('db'));

import * as User from '../models/user';

const baseInitiDB = async () => {
    // DEFAULT USERS
    let admin = await User.findOne({login: 'admin'});
    if (!admin) {
        admin = await User.create({
            _id: uuid(),
            login: 'admin',
            password: 'admin',
            isAdmin: true
        });
    }

    if (!await User.findOne({login: 'user'})) {
        await User.create({
            _id: uuid(),
            login: 'user',
            password: 'user',
        });
    }
    
    const count = 10;

    for (let i = 0; i <= count; i++) {
        if (!await User.findOne({login: `user${i}`})) {
            await User.create({
                _id: uuid(),
                login: `user${i}`,
                password: `user${i}`,
            });
        }
    }
    
    // ----------------------------------

    mongoose.connection.close();
    console.log('default init complite');
};

baseInitiDB();
