const {NotFoundError, BadRequestError} = require('./erros.model.js');

class CommonUtils {
  static catchError(res, err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({
        reason: err.message || 'DB error'
      });
    }

    if (err instanceof BadRequestError) {
      return res.status(400).json({
        reason: err.message || 'DB error'
      });
    }

    return res.status(500).json({
      reason: err.message || 'Internal Server Error.'
    });
  }
}

module.exports = CommonUtils;
