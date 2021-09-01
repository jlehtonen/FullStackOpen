const jwt = require("jsonwebtoken");
const config = require("./config");
const logger = require("./logger");
const User = require("../models/user");

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  req.roken = null;
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }

  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (!token) {
    req.user = null;
  } else {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken.id) {
      req.user = null;
    } else {
      req.user = await User.findById(decodedToken.id);
    }
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
