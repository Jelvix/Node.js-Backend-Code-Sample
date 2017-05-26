const {NotFoundError, BadRequestError} = require('./erros.model.js');

class CommonUtils {
  static catchError(res, err) {

    switch (typeof err) {
      case NotFoundError:
        return res.status(404).json({
          reason: err.message || 'DB error'
        });
        break;
      case BadRequestError:
        return res.status(400).json({
          reason: err.message || 'DB error'
        });
        break;
      default:
        return res.status(500).json({
          reason: err.message || 'Internal Server Error.'
        });
        break;
    }
  }
}

module.exports = CommonUtils;
