class CommonUtils {
  static catchError(res, err, code = 400) {
    return res.status(code).json({
      reason: err.message || 'DB error'
    });
  }
}

module.exports = CommonUtils;
