const prisma = require('../data/prisma');
const messages = require('../constants/messages');
const customError = require('../middlewares/customError');

function paginatedResults(model) {
  return async (req, res, next) => {
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await prisma[model].count({})))
      results.next = {
        page: page + 1,
        limit: limit
      };

    if (startIndex > 0)
      results.previous = {
        page: page - 1,
        limit: limit
      };
    try {
      results.results = await prisma[model].findMany({
        skip: startIndex,
        take: limit
      });

      res.paginatedResults = results;
    } catch (err) {
      throw new customError(messages.badRequest, 400);
    }

    next();
  };
}

module.exports = paginatedResults;
