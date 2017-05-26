const jwt = require('jsonwebtoken');
const md5 = require('md5');
const db = require('../../config/db');
const UserModel = require('./user.model')(db);
const ValidatorUtils = require('../../utils/validator');
const CommonUtils = require('../../utils/common');
const {NotFoundError, BadRequestError} = require('./../../utils/erros.model.js');

class User {
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

  static async getByIdValidator(req, res, next) {
    req.checkParams('id', 'Id is not valid.').isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async deleteById(req, res) {
    const {id} = req.params;
    try {
      const user = await UserModel.destroy({where: {id}});
      if (!user) {
        throw new NotFoundError(`User doesn't exist.`);
      }
      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }


  static async getOneById(req, res) {
    const {id} = req.params;
    const options = {
      where: {id},
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      },
      raw: true
    };

    try {
      const user = await UserModel.findOne(options);
      if (!user) {
        throw new NotFoundError(`User doesn't exist.`);
      }
      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateUserValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('role', 'Role is not valid.').notEmpty().isInt();
    req.checkParams('id', 'Id is not valid').isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async updateUser(req, res) {
    const {id} = req.params;
    const {name, email, role} = req.body;
    try {
      const existingUser = await UserModel.find({
        where: {
          email,
          id: {$ne: id}
        }
      });
      if (existingUser) {
        throw new BadRequestError(`User with email: "${email}" already exist.`);
      }

      return User.updateUserWithResponse({name, email, role}, id, res);
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateEmailValidator(req, res, next) {
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password must not be empty.').notEmpty();

    return ValidatorUtils.errorMapped(req, res, next);
  }

  static async updateEmail(req, res) {
    const {email, password} = req.body;

    try {
      const existingUser = await UserModel.find({
        where: {
          email,
          id: {$ne: req.user.id}
        }
      });
      if (existingUser) {
        throw new BadRequestError(`User with email: "${email}" already exists.`);
      }

      const passwordMd5 = md5(password);
      if (req.user.password !== passwordMd5) {
        throw new BadRequestError(`Passwords do not match.`);
      }

      return await User.updateUserWithResponse({email}, req.user.id, res);
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateNameValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();

    return ValidatorUtils.errorMapped(req, res, next);
  }

  static async updateMame(req, res) {
    const name = req.body.name;
    try {
      return await User.updateUserWithResponse({name}, req.user.id, res);
    }
    catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updatePasswordValidator(req, res, next) {
    req.checkBody('oldPassword', 'oldPassword must not be empty.').notEmpty();
    req.checkBody('newPassword', 'newPassword must not be empty.').notEmpty();

    return ValidatorUtils.errorMapped(req, res, next);
  }

  static async updatePassword(req, res) {
    const {newPassword, oldPassword} = req.body;
    const oldPasswordMd5 = md5(oldPassword);

    try {
      if (oldPasswordMd5 !== req.user.password) {
        throw new BadRequestError('Old password is not correct.');
      }

      const newPasswordMd5 = md5(newPassword);
      const result = await UserModel.update({password: newPasswordMd5}, {where: {id: req.user.id}});
      if (!result[0]) {
        throw new NotFoundError(`User doesn't exist.`);
      }
      return res.status(204).json();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateUserWithResponse(data, id, res) {
    await UserModel.update(data, {where : {id}});

    const user = await UserModel.findById(id, {
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
      }
    });
    if (!user) {
      throw new NotFoundError(`User doesn't exist.`);
    }

    return res.status(200).json({user});
  }

  static async getList(req, res) {
    const options = {
      offset: +req.query.offset || 0,
      limit: +req.query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'password', 'createdAt', 'deletedAt']
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
