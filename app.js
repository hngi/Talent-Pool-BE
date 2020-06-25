const express = require('express');
const dotenv = require('dotenv');

const cookieSession = require('cookie-session');

dotenv.config();
const morgan = require('morgan');
const db = require('./models');
const { seedSuperAdmin } = require('./seed');

const errorHandler = require('./Utils/error-handler');
// IMPORT SOCIAL AUTH FILES

// IMPORT PASSPORT CONFIGURATION

// IMPORT EMPLOYEE PROFILE ROUTER

// IMPORT EMPLOYEE HELP ROUTE

// IMPORT EMPLOYEE PORTFOLIO ROUTE

// IMPORT EMPLOYEE SKILLS ROUTE

// IMPORT EMPLOYEE SEARCH ROUTE

// IMPORT TEAM ROUTES

// IMPORT ADMIN MANAGEMENT ROUTE

// IMPORT CHAT ROUTE

// IMPORT ADMIN HELP OPERATION ROUTE

const app = express();
app.use(morgan('tiny'));
db.sequelize.sync().then(() => {
  seedSuperAdmin();
});

app.use(
  cookieSession({
    maxAge: 1 * 60 * 60 * 1000,
    name: 'session',
    keys: [process.env.TALENT_POOL_SESSION_COOKIEKEY],
  })
);

// passportjs initialization

// avoiding CORS(Cross Origin Resource Sharing), this adds to the headed
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES

// employees route

// employers route goes here

// admin routes goes here

// team route goes here

// auth

// global error handler
app.use(errorHandler);

module.exports = app;
