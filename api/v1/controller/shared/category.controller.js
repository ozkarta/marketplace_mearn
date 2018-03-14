module.exports = function (express) {
  let router = express.Router();
  let Category = require('../../model/category.model').model;
  let categories = require('../../shared/config/category/category');
  let Util = require('../../shared/util/util');
  let MSG = require('../../shared/messages/messages');

  router.get('/', async (req, res) => {
    let size = req.query.size || 10;
    let from = (req.query.page || 0) * size;


    let esQuery = {
      from: from,
      size: size,
      query: {
        bool: {
          filter: [
            {match: {includeInSearch: true}},
          ],
          must: []
        }
      }
    };
    let options = {
      hydrate: true,
      hydrateOptions: {select: '_id categoryName friendlyId parentCategory childCategories'}
    };

    if (req.query && req.query.categoryName) {
      let match_phrase_prefix = {
        'categoryName.en': `${req.query.categoryName}`
      };
      console.dir(match_phrase_prefix);
      esQuery.query.bool.filter.push({match_phrase_prefix: match_phrase_prefix});
    }
    // try {
    //   let categories = await Category.find({}).exec();
    //   if (categories) {
    //     res.status(200).json({categories: categories})
    //   }
    // } catch (error) {
    //   return Util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    // }

    // try {
    //   let categories = await Category.esSearch(esQuery, options).exec();
    //   return res.status(200).json({categories: categories});
    // } catch (error) {
    //   console.dir(error);
    //   return Util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
    // }

    console.dir(esQuery);

    Category.esSearch(esQuery, options, (error, categories) => {
      if (error) {
        return Util.sendHttpResponseMessage(res, MSG.serverError.internalServerError, error);
      }
      return res.status(200).json({categories: categories.hits.hits});
    })
  });

  router.post('/', async (req, res) => {
    await generateCategoryDb();

    async function generateCategoryDb() {
      let categoryObjectArray = [];
      try {
        for (let i=0; i<categories.length; i++) {
          categoryObjectArray.push(await createCategoryObject(categories[i], null));
        }
        console.log('Finished!');
      } catch (error) {
        console.dir(error);
      }

      res.status(200).json({categories: categoryObjectArray});
    }

    async function createCategoryObject(category, parent) {
      let categoryName = generateCategoryName(category.category_name);
      let categoryFriendlyId = generateFriendlyId(category.category_name);
      if (!categoryName) {
        return;
      }
      let categoryObject = new Category();
      categoryObject.categoryName = {
        en: categoryName,
        ge: categoryName
      };
      categoryObject.friendlyId = {
        en: categoryFriendlyId,
        ge: categoryFriendlyId
      };
      if (category.show_in_search) {
        categoryObject.includeInSearch = category.show_in_search;
      }
      categoryObject.parentCategory = parent;

      try {
        if (category.child_category && category.child_category.length) {
          for (let i=0; i<category.child_category.length; i++) {
            if (category.child_category[i]) {
              await createCategoryObject(category.child_category[i], categoryObject);
            }
          }
        }
      } catch (error) {
        console.dir(error);
      }
      try {
        let savedCategory = await categoryObject.save();

        if (parent) {
          parent.childCategories.push(categoryObject);
        }

        return savedCategory;
      } catch (error) {
        return null;
      }
    }

    function generateFriendlyId(text) {
      let result = text.split('@').join('');
      result = result.split('&').join('_and_');
      return result;
    }

    function generateCategoryName(text) {
      let result = text.split('@').join('');
      result = result.split('_').join(' ');
      result = result.split('&').join(' and ');
      return result;
    }
  });

  return router;
};