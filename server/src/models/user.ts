import { Document, model, Model, Schema } from 'mongoose';

import  * as crypto from 'crypto';
import  * as uuid from 'uuid';
import  * as config from 'config';

interface IUser extends Document {
  password: string;
  name: string;

  checkPassword(password: string): boolean;
}

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },

  email: {
    type: String,
    unique: true,
  },

  login: {
    type: String,
    unique: 'Такой логин уже существует'
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  passwordHash: String,
  salt: String,
});

userSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    if (password) {
      this.salt = crypto.randomBytes(4).toString('hex');
      this.passwordHash = crypto.pbkdf2Sync(
        password, new Buffer(this.salt, 'binary'), 10000, 64, 'DSA-SHA1').toString('base64');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })

  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  if (!password) {
    return false;
  }
  if (!this.passwordHash) {
    return false;
  }
  return crypto.pbkdf2Sync(
    password, new Buffer(this.salt, 'binary'), 10000, 64, 'DSA-SHA1').toString('base64') == this.passwordHash;
};

const User = model<IUser>('User', userSchema);

export = User;
