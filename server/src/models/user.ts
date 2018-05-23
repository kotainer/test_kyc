import { Document, model, Model, Schema } from 'mongoose';

import  * as crypto from 'crypto';
import  * as uuid from 'uuid';
import  * as config from 'config';

interface IUser extends Document {
  password: string;
  isVefiry: boolean;
  isAdmin: boolean;
  surname: string;
  name: string;
  documents: any;

  checkPassword(password: string): boolean;
}

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },

  login: {
    type: String,
    unique: 'Такой логин уже существует'
  },

  name: String,
  surname: String,

  documents: {
    passport: {
      files: [],
      status: {
        type: Number,
        default: 0 // 0 - новый 1 - отклонен 2 -  принят
      }
    },
    drivingLicense: {
      files: [],
      status: {
        type: Number,
        default: 0 // 0 - новый 1 - отклонен 2 -  принят
      }
    },
    selfie: {
      files: [],
      status: {
        type: Number,
        default: 0 // 0 - новый 1 - отклонен 2 -  принят
      }
    },
    controlSelfie: {
      files: [],
      status: {
        type: Number,
        default: 0 // 0 - новый 1 - отклонен 2 -  принят
      }
    },
    additional: {
      files: [],
      userComment: String,
      status: {
        type: Number,
        default: 0 // 0 - новый 1 - отклонен 2 -  принят
      }
    },

    controlInfo: {
      text: {
        type: String,
        default: generateEscape
      },
      place: {
        type: String,
        default: generatePlace
      },
    },
    status: {
      type: String,
      default: 'new',
      enum: [
        'new',
        'edit',
        'send',
        'decline',
        'accept'
      ]
    }

  },

  isVerify: {
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
        password, this.salt, 10000, 64, 'sha512').toString('base64');
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
    password, this.salt, 10000, 64, 'sha512').toString('base64') == this.passwordHash;
};

function generateEscape(count = 6, onlyNumber = false) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (onlyNumber) {
      possible = '0123456789';
  };

  for (let i = 0; i < count; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function generatePlace() {
  const possible = [
    'Слева по центру',
    'У головы справа',
    'На уровне груди',
    'В правой руке',
    'На уровне пояса',
    'У левого уха',
    'В левой рук',
    'Над головой'
  ];

  return possible[Math.floor(Math.random() * possible.length)];
}

const User = model<IUser>('User', userSchema);

export = User;
