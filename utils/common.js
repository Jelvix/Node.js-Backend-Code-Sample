class CommonUtils {
  static catchError(res, err) {
    return res.status(400).json({
      reason: err.message || 'DB error'
    });
  }
}

module.exports = CommonUtils;
