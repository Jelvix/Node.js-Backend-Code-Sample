const md5 = require('md5');
const UserService = require('./user.service');
const CommonUtils = require('../../utils/common');

class User {
  static async deleteById(req, res) {
    const {id} = req.params;
    try {
      await UserService.deleteUser(id);

      return res.status(204).send();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }


  static async getOneById(req, res) {
    const {id} = req.params;
    try {
      const user = await UserService.getUserById(id);

      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static getMe(req, res) {
    const user = req.user;
    delete user.password;
    return res.status(200).json({user});
  }

  static async updateUser(req, res) {
    const {id} = req.params;
    const {name, email, role} = req.body;
    try {
      await UserService.checkExistingEmail(id, email);
      const user = await UserService.updateUser(id, {name, email, role});

      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateEmail(req, res) {
    const {email, password} = req.body;
    const id = req.user.id;

    try {
      await UserService.checkExistingEmail(id, email);
      UserService.comparePasswords(req.user.password, password);
      const user = await UserService.updateUser(id, {email});

      return res.status(200).json({user});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updateMame(req, res) {
    const name = req.body.name;
    const id = req.user.id;
    try {
      const user = await UserService.updateUser(id, {name});

      return res.status(200).json({user});
    }
    catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async updatePassword(req, res) {
    const {newPassword, oldPassword} = req.body;
    const id = req.user.id;

    try {
      UserService.comparePasswords(req.user.password, oldPassword);

      const newPasswordMd5 = md5(newPassword);
      await UserService.updateUser(id, {password: newPasswordMd5});

      return res.status(204).json();
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getList(req, res) {

    try {
      const users = await UserService.getUsers(req.query.offset, req.query.limit);
      return res.status(200).json({users});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getMyStatistics(req, res) {
    const userId = req.user.id;

    try {
      const statistics = await UserService.getStatistics(userId);

      return res.status(200).json({statistics});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }

  static async getUserStatistics(req, res) {
    const userId = req.params.id;

    try {
      await UserService.checkIfUserExist(userId);

      const statistics = await UserService.getStatistics(userId);

      return res.status(200).json({statistics});
    } catch (err) {
      return CommonUtils.catchError(res, err);
    }
  }
}

module.exports = User;
