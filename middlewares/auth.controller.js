const jwt = require('jsonwebtoken');
const md5 = require('md5');
const db = require('../config/db');
const UserModel = require('./../components/user/user.model.js')(db);
const ValidatorUtils = require('../utils/validator');
const CommonUtils = require('../utils/common');

class Auth {
  static async loginValidator(req, res, next) {
    req.checkBody('email', 'Email not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password not valid').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async login(req, res) {
    const {email, password} = req.body;
    const passwordMd5 = md5(password);
    try {
      const user = await UserModel.find({
        where: {
          email,
          password: passwordMd5
        }
      });
      if (!user) {
        throw new Error('Missing or invalid authentication credentials.');
      }
      return res.json({
        id: user.id,
        token: jwt.sign({id: user.id, email}, process.env.secret)
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static authValidator() {
    return async (req, res, next) => {
      const token = req.body.token || req.query.token || req.headers['x-auth-token'];
      if (token) {
        return jwt.verify(token, process.env.secret, async (err, decoded) => {
          if (err) {
            return res.status(401).json({
              reason: 'Failed to authenticate token.'
            });
          }

          req.user = await UserModel.findById(decoded.id, {raw: true});
          return next();
        });
      }
      return next();
    };
  }

  static isUserPermission(req, res, next) {
    if (req.url === '/login' || req.url === '/registration') {
      return next();
    }
    const token = req.body.token || req.query.token || req.headers['x-auth-token'];
    if (!token) {
      return res.status(400).json({
        reason: 'No token provided.'
      });
    }

    if (!req.user) {
      return res.status(401).json({
        reason: 'Failed to authenticate token.'
      });
    }

    return next();
  }

  static isAdminPermission(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        reason: 'Permission denied.'
      });
    }

    return next();
  }
}

module.exports = Auth;
