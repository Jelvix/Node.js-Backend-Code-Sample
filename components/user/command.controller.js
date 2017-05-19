const CommandModel = require('./command.model');
const UserModel = require('./user.model');

const ValidatorUtils =  require('../../utils/validator');
const CommonUtils =  require('../../utils/common');

class Command {
  static async addValidator(req, res, next) {
    req.checkBody('title', 'Title not be empty.').notEmpty();
    req.checkBody('userId', 'UserId not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async add(req, res) {
    const {title, userId} = req.body;
    try {
      const userOld = await UserModel.findById(userId);
      if (!userOld) {
        throw new Error('User don\'t exists.')
      }
      const command = await CommandModel.create({
        title,
        userId
      });
      return res.status(200).json({
        id: command.id
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async deleteValidator(req, res, next) {
    req.checkParams('id', 'Id not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async deleteById(req, res) {
    const {id} = req.params;
    try {
     const row =  await CommandModel.destroy({
        where: {
          id
        }
      });
      if (!row) {
        return res.status(400).json({
          reason: 'Command not found.'
        });
      }
      return res.status(200);
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async myCommands(req, res) {
    try {
      const commands = await CommandModel.findAll({
        where: {
          userId: req.user.id
        },
        attributes: {
          exclude: ['updatedAt']
        }
      });
      return res.status(200).json({
        commands
      });
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = Command;
