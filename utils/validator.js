class ValidatorUtils {
  static async errorMapped(req, res, next) {
    const result = await req.getValidationResult();
    if (!result.isEmpty()) {
      return res.status(400).json(result.mapped());
    }
    return next();
  }

  static async titleValidator(req, res, next) {
    req.checkBody('title', 'Title must not be empty.').notEmpty();
    return ValidatorUtils.errorMapped(req, res, next);
  }

  static async idValidator(req, res, next) {
    req.checkParams('id', 'Id not valid.').notEmpty().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async limitOffsetValidator(req, res, next) {
    req.checkQuery('limit', 'Limit is not a number.').optional().isInt();
    req.checkQuery('offset', 'Limit is not a number.').optional().isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async updatePasswordValidator(req, res, next) {
    req.checkBody('oldPassword', 'oldPassword must not be empty.').notEmpty();
    req.checkBody('newPassword', 'newPassword must not be empty.').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async updateNameValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async updateEmailValidator(req, res, next) {
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('password', 'Password must not be empty.').notEmpty();
    return await ValidatorUtils.errorMapped(req, res, next);
  }

  static async updateUserValidator(req, res, next) {
    req.checkBody('name', 'Name must not be empty.').notEmpty();
    req.checkBody('email', 'Email is not valid.').notEmpty().isEmail();
    req.checkBody('role', 'Role is not valid.').notEmpty().isInt();
    req.checkParams('id', 'Id is not valid').isInt();
    return await ValidatorUtils.errorMapped(req, res, next);
  }
}

module.exports = ValidatorUtils;
