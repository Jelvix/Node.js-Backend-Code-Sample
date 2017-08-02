const md5 = require('md5');
const UserModel = require('./../user/user.model.js');
const ValidatorUtils = require('../../utils/validator');
const {BadRequestError} = require('../../utils/erros.model.js');

class AuthService {
  static async registrationValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password is not valid').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async createUser(data) {
    const existingUser = await UserModel.find({
      where: {
        email: data.email
      }
    });
    if (existingUser) {
      throw new BadRequestError('User already exists.');
    }

    const passwordMd5 = md5(data.password);
    return await UserModel.create({
      name: data.name,
      email: data.email,
      password: passwordMd5
    });
  }

  static async getUserByCredentials(data) {
    const passwordMd5 = md5(data.password);
    const user = await UserModel.find({
      where: {
        email: data.email,
        password: passwordMd5
      }
    });
    if (!user) {
      throw new BadRequestError('Missing or invalid authentication credentials.');
    }

    return user;
  }

  static async getUserById(id) {
    return await UserModel.findById(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
      raw: true
    });
  }
}

module.exports = AuthService;
