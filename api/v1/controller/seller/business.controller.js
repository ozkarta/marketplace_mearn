module.exports = function (express) {
  let router = express.Router();
  let config = require('../../../../config');
  let MSG = require('../../shared/messages/messages');
  let util = require('../../shared/util/util');
  let Business = require('../../model/business.model').model;
  let User = require('../../model/user.model').model;
  
  router.get('/', async (req, res) => {
    return res.status(200).json({});
  });

  router.post('/account', async (req, res) => {
    let business = new Business(req.body);
    try {
      let savedBusiness = await business.save();
      await User.findOneAndUpdate({_id: req.body.owner['_id']}, {business: savedBusiness}, {new: true});
      let populatedBusinesses = await Business.populate(savedBusiness, [{path: 'businessCategories'}])
      return res.status(200).json(populatedBusinesses);
    } catch (error) {
      console.dir(error);
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }
  });


  return router;
};