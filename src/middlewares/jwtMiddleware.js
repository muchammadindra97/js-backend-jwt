const jwt = require('jsonwebtoken')

const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization

    if (typeof authHeader === 'undefined') {
      res
        .status(401)
        .json({
          status: 'fail',
          message: 'Unauthorized'
        })

      return
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({
            status: 'fail',
            message: 'Unauthorized'
          })

        return
      }

      if (roles.length > 0) {
        const { authorities } = decoded

        for (const role of authorities) {
          if (!roles.includes(role)) {
            res
              .status(403)
              .json({
                status: 'fail',
                message: 'Forbidden'
              })

            return
          }
        }
      }

      next()
    })
  }
}

module.exports = verifyToken
