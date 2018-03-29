module.exports = function (express) {
  let router = express.Router();


  let businessController = require('../controller/seller/business.controller')(express);
  let productController = require('../controller/seller/product.controller')(express);
  let storeController = require('../controller/seller/store.controller')(express);
  let uploadController = require('../controller/seller/media.controller')(express);

  router.use('/businesses', businessController);
  router.use('/products', productController);
  router.use('/stores', storeController);
  router.use('/upload', uploadController);

  return router;
};
