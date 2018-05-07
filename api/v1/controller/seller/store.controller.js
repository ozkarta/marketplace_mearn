module.exports = function (express) {
  let router = express.Router();
  let config = require('../../../../config');
  let MSG = require('../../shared/messages/messages');
  let util = require('../../shared/util/util');
  let Store = require('../../model/store.model').model;

  router.get('/:userId', async (req, res) => {
    let userId = req.params.userId;
    console.log(userId);
    if (!userId) {
      return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, 'userId is missing.');
    }

    try {
      let store = await Store.findOne({owner: userId})
        .populate([{path: 'categories'}])
        .exec();
      return res.status(200).json(store);
    } catch (error) {
      console.dir(error);
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }

  });

  router.put('/:userId', async (req, res) => {
    let userId = req.params.userId;
    if (!userId) {
      return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, 'userId is missing.');
    }
    
    try {
      let updatedStore = await Store.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}).exec();
      if (updatedStore) {
        let store = await Store.findById(req.body._id)
          .populate([{path: 'categories'}])
          .exec();

          return res.status(200).json(store);
      }
      return res.status(200).json(null);
    } catch (error) {
      console.dir(error);
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }

  });

  router.post('/', async (req, res) => {
    let store = new Store(req.body);
    try {
      let savedStore = await store.save();
      if (savedStore) {
        return res.status(200).json(savedStore);
      }
      return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, null, 'Unknown error. Store could not be saved');
    } catch (error) {
      console.dir(error);
      return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    }

  })


  return router;
};