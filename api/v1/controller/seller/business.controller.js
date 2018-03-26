module.exports = function (express) {
  let router = express.Router();
  let config = require('../../../../config');
  let MSG = require('../../shared/messages/messages');
  let util = require('../../shared/util/util');

  router.get('/', async (req, res) => {
    return res.status(200).json({});
  });

  router.post('/account', async (req, res) => {
    console.dir(req.body);
    return res.status(200).json({});
  });


  return router;
};