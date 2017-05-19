class ValidatorUtils {
  static async errorMapped(req, res, next) {
    const result = await req.getValidationResult();
    if (!result.isEmpty()) {
      return res.status(400).json(result.mapped());
    }
    return next();
  }
}

module.exports = ValidatorUtils;
