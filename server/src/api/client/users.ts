import * as asyncBusboy from 'async-busboy';
import * as User from '../../models/user'

const uuid = require('uuid');
const fs = require('fs');
const fse = require('fs-extra');
const appRootDir = require('app-root-dir').get();

export class Users {
    getMy = async (ctx) => {
        ctx.body = {
            result: true,
            data: ctx.user
        }
    }

    uploadPhoto = async (ctx) => {
        const {fields, files} = await asyncBusboy(ctx.req);

        await this.attachPhotoFiles(files, ctx.user);

        ctx.body = {
            result: true,
            data: ctx.user
        }
    }

    attachPhotoFiles = async (files, user) => {
        if (!files || files.length === 0) {
            return;
        }

        const result = [];

        for (const file of files) {
            const newDir = `${appRootDir}/public/images/${user._id}`;
            fse.ensureDirSync(newDir);

            const ext = file.path.split('.');
            const newName = `${uuid()}.${ext[ext.length - 1]}`;
            await new Promise(resolve => {
                fs.rename(file.path, `${newDir}/${newName}`, function (err) {
                    if (err) {
                        throw err;
                    }
                    resolve();
                });
            });

            user.documents[file.fieldname].files.push({
                comment: '',
                img: `/images/${user._id}/${newName}`
            });

            user.documents[file.fieldname].status = 0;
        }

        user.updatedAt = new Date();
        await user.save();
    }

    update = async (ctx) => {
        await User.update({ _id: ctx.user._id}, ctx.request.body);
        
        ctx.body = {
            result: true
        }
    }
}