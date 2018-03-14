module.exports = function (express) {
    let router = express.Router();
    let UserModel = require('../model/user.model').model;
    let jwt = require('jsonwebtoken');
    let bcrypt = require('bcryptjs');
    let config = require('../../../config');
    let MSG = require('../shared/messages/messages');
    let util = require('../shared/util/util');

    router.get('/', async (req, res) => {
        console.dir(req.query);
        console.dir(req.params);

        let zip;

        if (req.query && req.query.zip) {
            zip = req.query.zip;
        }

        if (zip) {
          try {
            let users = await UserModel.find({'address.zip': zip})
              .select('updatedAt createdAt firstName lastName email address role')
              .exec();

            return res.status(200).json({users: users});
          } catch (error) {
            return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
          }

        } else {
            return res.status(200).json({users: []});
        }

    });

    router.post('/register', async (req, res) => {

      try {
        let result = await UserModel.findOne({ email: req.body.email })
          .lean()
          .exec();

        if (result) {
          return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, null, 'User Exists');
        }

        let user = new UserModel(req.body);
        user.passwordHash = bcrypt.hashSync(req.body.password, 8);

        try {
          let userSaved = user.save();
          let token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });

          delete userSaved['passwordHash'];
          return res.status(200).send({ auth: true, token: token , user: userSaved});
        } catch (error) {
          return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
        }

      } catch (error) {
        return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
      }

    });

    router.post('/sign-in', async (req, res) => {

        if (!req.body) {
            return res.status(400).json({});
        }

        try {
          let user = await UserModel.findOne({email: req.body.email})
            .lean()
            .exec();

          if (!user) {
            return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, null, 'Email was not found');
          }

          let passwordIsValid = bcrypt.compareSync(req.body.password, user.passwordHash);
          if (!passwordIsValid) {
            return util.sendHttpResponseMessage(res, MSG.clientError.badRequest, null, 'Password does not match');
          }

          let token = jwt.sign({ id: user._id }, config.SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });
          delete user['passwordHash'];
          res.status(200).send({ auth: true, token: token, user: user });

        } catch(error) {
          return util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
        }

    });

    router.get('/log-out', function(req, res) {
        res.status(200).send({ auth: false, token: null });
    });

    router.put('/', (req, res) => {
        return res.status(200).json({});
    });

    return router;
};