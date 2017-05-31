const jwt = require('jsonwebtoken');
const md5 = require('md5');
const db = require('../../config/db');
const UserModel = require('./../user/user.model.js')(db);
const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');
const {BadRequestError} = require('../../utils/erros.model.js');

class Auth {
  static async registrationValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password is not valid').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async registration(req, res) {
    const {name, email, password} = req.body;
    try {
      const existingUser = await UserModel.find({
        where: {
          email
        }
      });
      if (existingUser) {
        throw new BadRequestError('User already exists.');
      }

      const passwordMd5 = md5(password);
      const user = await UserModel.create({
        name,
        email,
        password: passwordMd5
      });
      return res.json({
        id: user.id,
        token: jwt.sign({email, id: user.id}, process.env.secret)
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

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

  static authValidator(role) {
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

          if (!req.user) {
            return res.status(401).json({
              reason: 'Failed to authenticate token.'
            });
          }

          if (req.user.role < role) {
            return res.status(401).json({
              reason: 'Permission denied.'
            });
          }

          return next();
        });
      }

      return res.status(400).json({
        reason: 'No token provided.'
      });
    };
  }
}

module.exports = Auth;
