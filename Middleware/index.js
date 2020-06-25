/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const jwtExpress = require('express-jwt');
const { errorResMsg } = require('../Utils/response');

const secret = process.env.TALENT_POOL_JWT_SECRET;

exports.checkToken = async (req, res, next) => {
  const authHeader = req.headers['x-access-token'] || req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return errorResMsg(
          res,
          401,
          'Authentication error, You are not authenticated!'
        );
      }
      // if everything is good, save to request for use in other routes !
      req.decoded = decoded;
      next();
    });
  } else {
    return errorResMsg(res, 401, 'Authentication error, token required');
  }
};

// Check if your are authorized for the route
exports.authorize = (role_ids = []) => {
  if (typeof role_ids === 'string') {
    // eslint-disable-next-line no-param-reassign
    role_ids = [role_ids];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwtExpress({ secret }),

    // authorize based on user role
    (req, res, next) => {
      if (role_ids.length && !role_ids.includes(req.user.userRole)) {
        // user's role is not authorized
        return res
          .status(401)
          .json({
            message: `User Role: ${req.user.userRole} does not have permission to perform this action or access this route`,
          });
      }

      // authentication and authorization successful
      next();
    },
  ];
};
