const jwt = require('jsonwebtoken');
const AuthService = require('./auth.service');
const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');

class Auth {
  static async registration(req, res) {
    const {name, email, password} = req.body;
    try {
      const user = await AuthService.createUser({name, email, password});
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
    try {
      const user = await AuthService.getUserByCredentials(req.body);
      return res.json({
        id: user.id,
        token: jwt.sign({id: user.id, email: user.email}, process.env.secret)
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

          req.user = await AuthService.getUserById(decoded.id);

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
