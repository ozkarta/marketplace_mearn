module.exports = function (express) {
  let router = express.Router();
  let config = require('../../../../config');
  let MSG = require('../../shared/messages/messages');
  let util = require('../../shared/util/util');
  let Business = require('../../model/business.model').model;
  let User = require('../../model/user.model').model;
  let mongoose = require('mongoose');
  
  router.get('/profile/:userId', async (req, res) => {
    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId )) {
      return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, null, 'You should include VALID userId in request parameters.');
    }
    try {
      let result = await Business.findOne({owner: req.params.userId})
        .populate([{path: 'businessCategories'}]);
      return res.status(200).json(result);
    } catch (error) {
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }
  });

  router.post('/profile', async (req, res) => {
    let business = new Business(req.body);
    try {
      let savedBusiness = await business.save();
      await User.findOneAndUpdate({_id: req.body.owner['_id']}, {business: savedBusiness}, {new: true});
      let populatedBusinesses = await Business.populate(savedBusiness, [{path: 'businessCategories', populate: {path: 'businessCategories'}}])
      return res.status(200).json(populatedBusinesses);
    } catch (error) {
      console.dir(error);
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }
  });

  router.put('/profile', async (req, res) => {
    try {
      let updatedResult = await Business.findByIdAndUpdate(req.body._id, req.body, {new: true});
      return res.status(200).json(updatedResult);
    } catch (error) {
      console.dir(error);
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }    
  });


  return router;
};