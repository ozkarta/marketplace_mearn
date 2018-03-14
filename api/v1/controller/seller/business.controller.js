module.exports = function (express) {
  let router = express.Router();
  let config = require('../../../../config');
  let MSG = require('../../shared/messages/messages');
  let util = require('../../shared/util/util');

  router.get('/', async (req, res) => {
    res.status(200).json({});
  });


  return router;
};