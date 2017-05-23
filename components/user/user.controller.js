const jwt = require('jsonwebtoken');
const md5 = require('md5');

const UserModel = require('./user.model');
const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');

class User {
  static async registrationValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password is not valid').notEmpty();
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

  static async getByIdValidator(req, res, next) {
    req.checkParams('id', 'Id is not valid.').isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async deleteById(req, res) {
    const {id} = req.params;
    try {
      const user = await UserModel.update({deleted: true}, {where: {id, deleted: false}});
      if (!user[0]) {
        throw new Error(`User doesn't exist.`);
      }
      return res.status(200).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getOneById(req, res) {
    const {id} = req.params;
    const options = {
      where: {id, deleted: false},
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deleted']
      },
      raw: true
    };

    try {
      const user = await UserModel.findOne(options);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }
      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {
    const options = {
      where: {deleted: false},
      offset: +req.query.offset || 0,
      limit: +req.query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deleted']
      },
      raw: true
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
