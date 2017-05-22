const jwt = require('jsonwebtoken');
const md5 = require('md5');

const UserModel = require('./user.model');
const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');

class User {
  static async registrationValidator(req, res, next) {
    req.checkBody('name', 'Name not be empty.').notEmpty();
    req.checkBody('email', 'Email not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password not valid').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async registration(req, res) {
    const {name, email, password} = req.body;
    const passwordMd5 = md5(password);
    try {
      const userOld = await UserModel.find({
        where: {
          email
        }
      });
      if (userOld) {
        throw new Error('User already exists.');
      }
      const user = await UserModel.create({
        name,
        email,
        password: passwordMd5
      });
      return res.json({
        id: user.id,
        token: jwt.sign({email, name, password: passwordMd5}, process.env.secret)
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getOneValidator(req, res, next){
    req.checkBody('id', 'Id is not valid.').isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async getOne(req, res) {
    const {id} = req.params;
    const options = {
      where: {id},
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt']
      }
    };

    try {
      const user = await UserModel.findOne(options);
      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    const options = {
      offset: +req.query.offset || 0,
      limit: +req.query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'password']
      }
    };

    try {
      const users = await UserModel.findAll(options);
      return res.status(200).json({users});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = User;
