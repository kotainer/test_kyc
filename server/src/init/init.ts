const mongoose = require('mongoose');
const config = require('config');
const uuid = require('uuid');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('db'), {useMongoClient: true});

import * as User from '../models/user';

const baseInitiDB = async () => {
    // DEFAULT USERS
    let mlmUser = await User.findOne({login: 'mlm'});
    if (!mlmUser) {
        mlmUser = await User.create({
            _id: uuid(),
            login: 'mlm',
            password: 'mlm_bug',
            email: 'mlm',
        });
    }

    if (!await User.findOne({login: 'user'})) {
        await User.create({
            _id: uuid(),
            login: 'user',
            password: 'user',
            email: 'user',
            parent: mlmUser._id,
        });
    }
    // ----------------------------------

    mongoose.connection.close();
    console.log('default init complite');
};

baseInitiDB();
