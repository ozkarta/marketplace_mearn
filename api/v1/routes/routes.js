module.exports = function (express) {
  var router = express.Router();
  var passport = require('passport');

  router.use(passport.initialize());
  router.use(passport.session());

  let userController = require('../controller/user.controller')(express);
  let buyerRoutes = require('./buyer.routes')(express);
  let sellerRoutes = require('./seller.routes')(express);
  // Shared
  let categoryController = require('../controller/shared/category.controller')(express);
  //__________________________________
  router.use('/users', userController);
  router.use('/buyer', buyerRoutes);
  router.use('/seller', sellerRoutes);


  router.use('/shared/categories', categoryController);

  return router;
};
